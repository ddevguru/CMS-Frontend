import React, { useState } from "react";
import axios from "axios";

const AddCheatingRecord = () => {
  const [studentName, setStudentName] = useState("");
  const [reason, setReason] = useState("");
  const [proof, setProof] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/add_cheating_record", {
        student_name: studentName,
        reason: reason,
        proof: proof, // URL to proof image/document
      });

      setMessage(response.data.message);
      setStudentName("");
      setReason("");
      setProof("");
    } catch (error) {
      setMessage("Error adding record");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      <h2>Add Cheating Record</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
        <br />
        <textarea
          rows="4"
          placeholder="Reason for Cheating"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Proof (URL)"
          value={proof}
          onChange={(e) => setProof(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add Record</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default AddCheatingRecord;
