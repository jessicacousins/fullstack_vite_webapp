import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const AdminBillingDashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState({
    totalPaid: 0,
    totalOverdue: 0,
    totalPending: 0,
  });

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const res = await axios.get("/api/invoices");
    setInvoices(res.data);

    let totalPaid = 0;
    let totalOverdue = 0;
    let totalPending = 0;
    res.data.forEach((inv) => {
      if (inv.status === "paid") totalPaid += inv.totalAmount;
      if (inv.status === "overdue") totalOverdue += inv.totalAmount;
      if (inv.status === "sent" || inv.status === "draft")
        totalPending += inv.totalAmount;
    });
    setStats({ totalPaid, totalOverdue, totalPending });
  };

  return (
    <div>
      <h2>Financial Reports</h2>
      <div>
        <p>Total Collected: ${stats.totalPaid}</p>
        <p>Total Overdue: ${stats.totalOverdue}</p>
        <p>Total Pending: ${stats.totalPending}</p>
      </div>
      <h3>Invoice List</h3>
      <table>
        <thead>
          <tr>
            <th>Invoice#</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv._id}>
              <td>{inv.invoiceNumber}</td>
              <td>{inv.customer?.name}</td>
              <td>${inv.totalAmount}</td>
              <td>{moment(inv.dueDate).format("YYYY-MM-DD")}</td>
              <td>{inv.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBillingDashboard;
