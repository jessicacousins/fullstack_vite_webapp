import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Invoice.css";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customerId: "",
    items: [{ description: "", quantity: 1, unitPrice: 0 }],
  });

  useEffect(() => {
    fetchInvoices();
    fetchCustomers();
  }, []);

  const fetchInvoices = async () => {
    const res = await axios.get("/api/invoices");
    setInvoices(res.data);
  };

  const fetchCustomers = async () => {
    const res = await axios.get("/api/customers");
    setCustomers(res.data);
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { description: "", quantity: 1, unitPrice: 0 },
      ],
    });
  };

  const createInvoice = async (e) => {
    e.preventDefault();
    await axios.post("/api/invoices", formData);
    setFormData({
      customerId: "",
      items: [{ description: "", quantity: 1, unitPrice: 0 }],
    });
    fetchInvoices();
  };

  const payInvoice = async (id) => {
    await axios.post(`/api/invoices/${id}/pay`);
    fetchInvoices();
  };

  return (
    <div className="invoices-container">
      <h2 className="invoices-header">Invoices</h2>

      <div className="invoice-directions">
        <h3>📄 Invoice Management Instructions</h3>
        <p>
          This page allows companies to create and manage invoices for
          customers. Each invoice is associated with a customer record from the{" "}
          <strong>Customers</strong> section of the site. Please follow the
          steps below:
        </p>
        <ul>
          <li>
            <strong>Step 1:</strong> Ensure you’ve created the customer in the
            Customers tab.
          </li>
          <li>
            <strong>Step 2:</strong> Select the customer from the dropdown
            below.
          </li>
          <li>
            <strong>Step 3:</strong> Add one or more invoice items including
            description, quantity, and unit price.
          </li>
          <li>
            <strong>Step 4:</strong> Click “Create Invoice” to save the record
            and generate the total amount.
          </li>
          <li>
            <strong>Step 5:</strong> Use the “Pay” button to simulate a payment
            or download a PDF for recordkeeping.
          </li>
        </ul>
        <p>
          All data is synced with your backend MongoDB database and invoices
          will appear in the table below with live updates.
        </p>
      </div>

      <form className="invoice-form" onSubmit={createInvoice}>
        <select
          value={formData.customerId}
          onChange={(e) =>
            setFormData({ ...formData, customerId: e.target.value })
          }
          required
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {formData.items.map((item, idx) => (
          <div className="invoice-item" key={idx}>
            <input
              className="invoice-input"
              placeholder="Description"
              value={item.description}
              onChange={(e) => {
                const newItems = [...formData.items];
                newItems[idx].description = e.target.value;
                setFormData({ ...formData, items: newItems });
              }}
              required
            />
            <input
              className="invoice-input"
              placeholder="Qty"
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const newItems = [...formData.items];
                newItems[idx].quantity = parseInt(e.target.value);
                setFormData({ ...formData, items: newItems });
              }}
              required
            />
            <input
              className="invoice-input"
              placeholder="Unit Price"
              type="number"
              value={item.unitPrice}
              onChange={(e) => {
                const newItems = [...formData.items];
                newItems[idx].unitPrice = parseFloat(e.target.value);
                setFormData({ ...formData, items: newItems });
              }}
              required
            />
          </div>
        ))}

        <button type="button" className="add-item-btn" onClick={addItem}>
          Add Item
        </button>
        <button type="submit" className="invoice-submit-btn">
          Create Invoice
        </button>
      </form>

      <table className="invoices-table">
        <thead>
          <tr>
            <th>Invoice#</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv._id}>
              <td>{inv.invoiceNumber}</td>
              <td>{inv.customer?.name}</td>
              <td>${inv.totalAmount}</td>
              <td>{inv.status}</td>
              <td>
                {inv.status !== "paid" && (
                  <button
                    className="action-btn"
                    onClick={() =>
                      (window.location.href = `/invoice-payment/${inv._id}`)
                    }
                  >
                    Pay
                  </button>
                )}
                <a
                  href={`/api/invoices/${inv._id}/pdf`}
                  className="pdf-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
