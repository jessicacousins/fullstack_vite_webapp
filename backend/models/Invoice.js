const mongoose = require("mongoose");

const InvoiceItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  total: { type: Number, required: true },
});

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  items: [InvoiceItemSchema],
  totalAmount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["draft", "sent", "paid", "overdue", "canceled"],
    default: "draft",
  },
  paymentIntentId: { type: String },
  createdAt: { type: Date, default: Date.now },
  paidAt: { type: Date },
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;
