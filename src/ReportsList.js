import React, { useState, useEffect } from "react";
import axios from "axios";

const ReportsList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/reports")
      .then((response) => setReports(response.data))
      .catch((error) => console.error("Error fetching reports:", error));
  }, []);

  return (
    <div className="container">
      <h2>Submitted Reports</h2>
      {reports.map((report) => (
        <div key={report.id} className="report-card">
          <h3>{report.student_name} (Age: {report.age})</h3>
          <p><b>Symptoms:</b> {report.symptoms}</p>
          <p><b>Diagnosis:</b> {report.diagnosis}</p>
          <p><b>Medicine:</b> {report.prescribed_medicine}</p>
          <p><b>Remarks:</b> {report.remarks}</p>
        </div>
      ))}
    </div>
  );
};

export default ReportsList;
