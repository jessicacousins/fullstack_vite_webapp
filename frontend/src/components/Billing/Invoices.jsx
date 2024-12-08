import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <h2>Invoices</h2>
      <form onSubmit={createInvoice}>
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
          <div key={idx}>
            <input
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
        <button type="button" onClick={addItem}>
          Add Item
        </button>
        <button type="submit">Create Invoice</button>
      </form>

      <table>
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
              {/* <td>
                {inv.status !== "paid" && (
                  <button onClick={() => payInvoice(inv._id)}>Pay</button>
                )}
                <a
                  href={`/api/invoices/${inv._id}/pdf`}
                  target="_blank"
                  rel="noreferrer"
                >
                  PDF
                </a>
              </td> */}
              // In the Action column:
              <td>
                {inv.status !== "paid" && (
                  <button
                    onClick={() =>
                      (window.location.href = `/invoice-payment/${inv._id}`)
                    }
                  >
                    Pay
                  </button>
                )}
                <a
                  href={`/api/invoices/${inv._id}/pdf`}
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
