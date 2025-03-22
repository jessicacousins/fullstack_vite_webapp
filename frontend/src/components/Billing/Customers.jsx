import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Customers.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await axios.get("/api/customers");
    setCustomers(res.data);
  };

  const createCustomer = async (e) => {
    e.preventDefault();
    const { name, email, phone, line1, city, state, postal_code, country } =
      formData;
    const address = { line1, city, state, postal_code, country };
    await axios.post("/api/customers", { name, email, phone, address });
    setFormData({
      name: "",
      email: "",
      phone: "",
      line1: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
    });
    fetchCustomers();
  };

  return (
    <div className="customers-container">
      <h2 className="customers-header">Customers</h2>

      <div className="customers-directions">
        <h3>Manage Customer Records</h3>
        <p>
          Use this form to add new customers into your backend database. Each
          entry is stored in MongoDB and linked to the Invoices page where you
          can generate and manage billing records. Make sure the information is
          accurate before submitting.
        </p>
        <ul>
          <li>
            <strong>Name & Email:</strong> Required for contact and invoice
            tracking.
          </li>
          <li>
            <strong>Phone:</strong> Optional but helpful for follow-up.
          </li>
          <li>
            <strong>Address:</strong> Complete address supports accurate
            invoicing and records.
          </li>
          <li>
            New entries appear below in the customer list table for reference.
          </li>
        </ul>
      </div>

      <form className="customer-form" onSubmit={createCustomer}>
        <input
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <input
          placeholder="Address Line1"
          value={formData.line1}
          onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
        />
        <input
          placeholder="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
        <input
          placeholder="State"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
        />
        <input
          placeholder="Postal Code"
          value={formData.postal_code}
          onChange={(e) =>
            setFormData({ ...formData, postal_code: e.target.value })
          }
        />
        <input
          placeholder="Country"
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
        />
        <button type="submit">Create Customer</button>
      </form>

      {customers.length === 0 ? (
        <p className="no-customers">No customers found</p>
      ) : (
        <table className="customers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  {c.address?.line1}, {c.address?.city}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Customers;
