import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminTimecards.css";

const AdminTimecards = () => {
  const [timecards, setTimecards] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

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

  const calculateTotalHours = (clockIn, clockOut) => {
    if (!clockOut) return 0;
    const totalHours = (new Date(clockOut) - new Date(clockIn)) / 1000 / 3600;
    return totalHours.toFixed(2);
  };

  const calculatePay = (totalHours, wage, isHoliday) => {
    const regularHours = Math.min(totalHours, 40);
    const overtimeHours = totalHours > 40 ? totalHours - 40 : 0;
    const holidayMultiplier = isHoliday ? 1.5 : 1;
    const regularPay = regularHours * wage * holidayMultiplier;
    const overtimePay = overtimeHours * wage * 1.5;
    return {
      regularPay: regularPay.toFixed(2),
      overtimePay: overtimePay.toFixed(2),
    };
  };

  const handleFilterChange = (e) => setFilter(e.target.value.toLowerCase());

  const handleSort = (column) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
  };

  const sortedTimecards = [...timecards].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a.employee?.[sortColumn] || 0;
    const bValue = b.employee?.[sortColumn] || 0;
    return sortOrder === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const filteredTimecards = sortedTimecards.filter((entry) =>
    entry.employee?.email?.toLowerCase().includes(filter)
  );

  const paginatedTimecards = filteredTimecards.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalSummary = timecards.reduce(
    (summary, entry) => {
      const totalHours =
        parseFloat(calculateTotalHours(entry.clockIn, entry.clockOut)) || 0;
      summary.totalHours += totalHours;
      summary.totalRegularPay += parseFloat(
        calculatePay(totalHours, entry.employee?.wage || 0, entry.isHoliday)
          .regularPay
      );
      summary.totalOvertimePay += parseFloat(
        calculatePay(totalHours, entry.employee?.wage || 0, entry.isHoliday)
          .overtimePay
      );
      if (entry.isHoliday) summary.holidayHours += totalHours;
      return summary;
    },
    { totalHours: 0, totalRegularPay: 0, totalOvertimePay: 0, holidayHours: 0 }
  );

  const exportToCSV = () => {
    const headers = [
      "Employee Email",
      "Clock In",
      "Clock Out",
      "Total Hours",
      "Wage Rate",
      "Regular Pay",
      "Overtime Pay",
      "Holiday Pay",
    ];
    const rows = filteredTimecards.map((entry) => [
      entry.employee?.email || "N/A",
      new Date(entry.clockIn).toLocaleString(),
      entry.clockOut ? new Date(entry.clockOut).toLocaleString() : "Ongoing",
      calculateTotalHours(entry.clockIn, entry.clockOut),
      `$${entry.employee?.wage?.toFixed(2) || "N/A"}`,
      `$${
        calculatePay(
          parseFloat(calculateTotalHours(entry.clockIn, entry.clockOut)) || 0,
          entry.employee?.wage || 0,
          entry.isHoliday
        ).regularPay
      }`,
      `$${
        calculatePay(
          parseFloat(calculateTotalHours(entry.clockIn, entry.clockOut)) || 0,
          entry.employee?.wage || 0,
          entry.isHoliday
        ).overtimePay
      }`,
      entry.isHoliday ? "Yes" : "No",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "timecards.csv";
    link.click();
  };

  return (
    <div className="admin-timecards-container">
      <h2 className="admin-timecards-header">Employee Timecards</h2>

      <div className="summary-container">
        <p>Total Hours Worked: {totalSummary.totalHours.toFixed(2)}</p>
        <p>Total Regular Pay: ${totalSummary.totalRegularPay.toFixed(2)}</p>
        <p>Total Overtime Pay: ${totalSummary.totalOvertimePay.toFixed(2)}</p>
        <p>Total Holiday Hours: {totalSummary.holidayHours.toFixed(2)}</p>
      </div>

      <button onClick={exportToCSV} className="export-button">
        Export to CSV
      </button>

      <div className="filter-container">
        <label htmlFor="filter">Filter by Email:</label>
        <input
          type="text"
          id="filter"
          placeholder="Enter employee email..."
          onChange={handleFilterChange}
        />
      </div>

      <table className="admin-timecards-table">
        <thead className="admin-timecards-thead">
          <tr>
            <th
              className="admin-timecards-th"
              onClick={() => handleSort("email")}
            >
              Employee Email
            </th>
            <th className="admin-timecards-th">Clock In</th>
            <th className="admin-timecards-th">Clock Out</th>
            <th className="admin-timecards-th">Total Hours</th>
            <th className="admin-timecards-th">Wage Rate</th>
            <th className="admin-timecards-th">Regular Pay</th>
            <th className="admin-timecards-th">Overtime Pay</th>
            <th className="admin-timecards-th">Holiday Pay</th>
          </tr>
        </thead>
        <tbody className="admin-timecards-tbody">
          {paginatedTimecards.length > 0 ? (
            paginatedTimecards.map((entry) => {
              const totalHours = calculateTotalHours(
                entry.clockIn,
                entry.clockOut
              );
              const { regularPay, overtimePay } = calculatePay(
                parseFloat(totalHours) || 0,
                entry.employee?.wage || 0,
                entry.isHoliday
              );

              return (
                <tr
                  key={entry._id}
                  className={`admin-timecards-row ${
                    totalHours > 40
                      ? "highlight-overtime"
                      : entry.isHoliday
                      ? "highlight-holiday"
                      : ""
                  }`}
                >
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
                  <td className="admin-timecards-td">{totalHours}</td>
                  <td className="admin-timecards-td">
                    ${entry.employee?.wage?.toFixed(2) || "N/A"}
                  </td>
                  <td className="admin-timecards-td">${regularPay}</td>
                  <td className="admin-timecards-td">${overtimePay}</td>
                  <td className="admin-timecards-td">
                    {entry.isHoliday ? "Yes" : "No"}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="admin-timecards-no-data">
                No Timecards Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination-container">
        {Array.from(
          { length: Math.ceil(filteredTimecards.length / rowsPerPage) },
          (_, index) => (
            <button key={index} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AdminTimecards;
