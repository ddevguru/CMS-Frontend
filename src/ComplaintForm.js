import React, { useState, useEffect } from "react";
import axios from "axios";

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState("");
  const [complaints, setComplaints] = useState([]); // State to store all complaints
  const [warning, setWarning] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch complaints when the component mounts
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get_complaints");
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning(null);
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5000/submit_complaint", {
        complaint: complaint,
      });

      if (response.data.warning) {
        setWarning(response.data.warning);
      }

      setSuccessMessage(response.data.message);
      setComplaint("");

      // Fetch updated complaints after submission
      fetchComplaints();
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h2>Anonymous Complaint Form</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          cols="50"
          placeholder="Enter your complaint..."
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit Complaint</button>
      </form>
      {warning && <p style={{ color: "red" }}>⚠ {warning}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <h3>All Complaints</h3>
      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Complaint</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length > 0 ? (
            complaints.map((comp) => (
              <tr key={comp.id}>
                {/* <td>{comp.id}</td> */}
                <td>{comp.complaint}</td>
                <td>{new Date(comp.submitted_at).toLocaleString()}</td> {/* Fixed Date Formatting */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No complaints found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintForm;
