const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");
const Customer = require("../models/Customer");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const Stripe = require("stripe");
const PDFDocument = require("pdfkit");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create a new invoice with decimal rounding
router.post("/", async (req, res) => {
  try {
    const { customerId, items, dueDays = 14 } = req.body;
    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    let totalAmount = 0;
    const invoiceItems = items.map((item) => {
      const lineTotal = item.quantity * item.unitPrice;
      return {
        description: item.description,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice.toFixed(2)),
        total: Number(lineTotal.toFixed(2)),
      };
    });

    totalAmount = invoiceItems.reduce((acc, i) => acc + i.total, 0);
    totalAmount = Number(totalAmount.toFixed(2));

    const invoiceNumber = `INV-${uuidv4()}`;
    const dueDate = moment().add(dueDays, "days").toDate();

    const newInvoice = new Invoice({
      invoiceNumber,
      customer: customerId,
      items: invoiceItems,
      totalAmount,
      dueDate,
      status: "draft",
    });

    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all invoices
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("customer")
      .sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single invoice by ID
router.get("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("customer");
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    res.json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Send invoice (mark as sent)
router.post("/:id/send", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    invoice.status = "sent";
    await invoice.save();
    res.json({ message: "Invoice sent" });
  } catch (error) {
    console.error("Error sending invoice:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create PaymentIntent (without immediately marking paid)
router.post("/:id/create-payment-intent", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("customer");
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    if (invoice.status === "paid") {
      return res.status(400).json({ error: "Invoice already paid." });
    }

    // Amount in cents!
    const amountInCents = Math.round(invoice.totalAmount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      receipt_email: invoice.customer.email,
      description: `Payment for invoice ${invoice.invoiceNumber}`,
      // add metadata here in future
    });

    invoice.paymentIntentId = paymentIntent.id;
    await invoice.save();

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Mark invoice as paid after successful confirmation from frontend
router.post("/:id/mark-paid", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });

    invoice.status = "paid";
    invoice.paidAt = new Date();
    await invoice.save();

    res.json({ message: "Invoice marked as paid", invoice });
  } catch (error) {
    console.error("Error marking invoice paid:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Generate PDF invoice
router.get("/:id/pdf", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("customer");
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${invoice.invoiceNumber}.pdf`
    );
    doc.pipe(res);

    doc
      .fontSize(20)
      .text(`Invoice: ${invoice.invoiceNumber}`, { underline: true });
    doc.moveDown();
    doc.fontSize(14).text(`Customer: ${invoice.customer.name}`);
    doc.text(`Email: ${invoice.customer.email}`);
    doc.text(`Date: ${moment(invoice.createdAt).format("YYYY-MM-DD")}`);
    doc.text(`Due Date: ${moment(invoice.dueDate).format("YYYY-MM-DD")}`);
    doc.moveDown();

    doc.text("Items:");
    invoice.items.forEach((item) => {
      doc.text(
        `${item.description} - ${item.quantity} x $${item.unitPrice.toFixed(
          2
        )} = $${item.total.toFixed(2)}`
      );
    });
    doc.moveDown();
    doc.text(`Total: $${invoice.totalAmount.toFixed(2)}`, { bold: true });

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Mark overdue invoices
router.post("/mark-overdue", async (req, res) => {
  try {
    const now = new Date();
    const overdueInvoices = await Invoice.find({
      status: { $in: ["draft", "sent"] },
      dueDate: { $lt: now },
    });

    for (const inv of overdueInvoices) {
      inv.status = "overdue";
      await inv.save();
    }

    res.json({
      message: "Overdue invoices updated",
      count: overdueInvoices.length,
    });
  } catch (error) {
    console.error("Error marking overdue invoices:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
