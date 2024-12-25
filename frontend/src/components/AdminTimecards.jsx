import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminTimecards.css";

const AdminTimecards = () => {
  const [timecards, setTimecards] = useState([]);
  const [filter, setFilter] = useState("");
  const [approvalFilter, setApprovalFilter] = useState("all");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [selectedTimecards, setSelectedTimecards] = useState([]);

  useEffect(() => {
    fetchTimecards();
  }, []);

  const fetchTimecards = async () => {
    try {
      const res = await axios.get("/api/timecards/admin/timecards");
      setTimecards(res.data);
    } catch (error) {
      console.error("Error fetching timecards:", error.message);
    }
  };

  const handleFilterChange = (e) => setFilter(e.target.value.toLowerCase());
  const handleApprovalFilterChange = (e) => setApprovalFilter(e.target.value);

  const handleSort = (column) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
  };

  const sortedTimecards = [...timecards].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn] || "";
    const bValue = b[sortColumn] || "";
    return sortOrder === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const filteredTimecards = sortedTimecards.filter((entry) => {
    const matchesEmail = entry.employee?.email?.toLowerCase().includes(filter);
    const matchesApprovalStatus =
      approvalFilter === "all" || entry.approvalStatus === approvalFilter;
    return matchesEmail && matchesApprovalStatus;
  });

  const paginatedTimecards = filteredTimecards.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleTimecardSelection = (id) => {
    setSelectedTimecards((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((timecardId) => timecardId !== id)
        : [...prevSelected, id]
    );
  };

  const handleApprovalStatusChange = async (id, status) => {
    try {
      await axios.put("/api/timecards/approve", {
        timecardId: id,
        approvalStatus: status,
      });
      fetchTimecards();
    } catch (error) {
      console.error("Error updating approval status:", error.message);
    }
  };

  const handleBulkApproval = async (status) => {
    try {
      await axios.put("/api/timecards/bulk-approve", {
        timecardIds: selectedTimecards,
        approvalStatus: status,
      });
      setSelectedTimecards([]);
      fetchTimecards();
    } catch (error) {
      console.error("Error performing bulk approval:", error.message);
    }
  };

  return (
    <div className="admin-timecards-container">
      <h2 className="admin-timecards-header">Employee Timecards</h2>

      <div className="filter-container">
        <label htmlFor="filter">Filter by Email:</label>
        <input
          type="text"
          id="filter"
          placeholder="Enter employee email..."
          onChange={handleFilterChange}
        />
        <label htmlFor="approvalFilter">Approval Status:</label>
        <select
          id="approvalFilter"
          value={approvalFilter}
          onChange={handleApprovalFilterChange}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <button
        onClick={() => handleBulkApproval("approved")}
        className="approve-button"
        disabled={selectedTimecards.length === 0}
      >
        Approve Selected
      </button>
      <button
        onClick={() => handleBulkApproval("rejected")}
        className="reject-button"
        disabled={selectedTimecards.length === 0}
      >
        Reject Selected
      </button>

      <table className="admin-timecards-table">
        <thead className="admin-timecards-thead">
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) =>
                  setSelectedTimecards(
                    e.target.checked
                      ? paginatedTimecards.map((entry) => entry._id)
                      : []
                  )
                }
              />
            </th>
            <th
              className="admin-timecards-th"
              onClick={() => handleSort("email")}
            >
              Employee Email
            </th>
            <th className="admin-timecards-th">Clock In</th>
            <th className="admin-timecards-th">Clock Out</th>
            <th className="admin-timecards-th">Total Hours</th>
            <th className="admin-timecards-th">Approval Status</th>
            <th className="admin-timecards-th">Actions</th>
          </tr>
        </thead>
        <tbody className="admin-timecards-tbody">
          {paginatedTimecards.length > 0 ? (
            paginatedTimecards.map((entry) => (
              <tr key={entry._id} className="admin-timecards-row">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedTimecards.includes(entry._id)}
                    onChange={() => toggleTimecardSelection(entry._id)}
                  />
                </td>
                <td className="admin-timecards-td">
                  {entry.employee?.email || "N/A"}
                </td>
                <td className="admin-timecards-td">
                  {new Date(entry.clockIn).toLocaleString()}
                </td>
                <td className="admin-timecards-td">
                  {entry.clockOut
                    ? new Date(entry.clockOut).toLocaleString()
                    : "Ongoing"}
                </td>
                <td className="admin-timecards-td">
                  {entry.totalHours?.toFixed(2) || "0.00"}
                </td>
                <td className="admin-timecards-td">{entry.approvalStatus}</td>
                <td className="admin-timecards-td">
                  <button
                    onClick={() =>
                      handleApprovalStatusChange(entry._id, "approved")
                    }
                  >
                    Approve
                  </button>
                  <button
                    className="reject-button-2"
                    onClick={() =>
                      handleApprovalStatusChange(entry._id, "rejected")
                    }
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="admin-timecards-no-data">
                No Timecards Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTimecards;
