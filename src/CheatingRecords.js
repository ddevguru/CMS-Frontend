import React, { useState, useEffect } from "react";
import axios from "axios";

const CheatingRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/cheating_records")
      .then(response => setRecords(response.data))
      .catch(error => console.error("Error fetching records:", error));
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", textAlign: "center" }}>
      <h2>Academic Cheating Records</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Reason</th>
            <th>Proof</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td>{record.student_name}</td>
              <td>{record.reason}</td>
              <td>
                <a href={record.proof} target="_blank" rel="noopener noreferrer">View Proof</a>
              </td>
              <td>{new Date(record.reported_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheatingRecords;
