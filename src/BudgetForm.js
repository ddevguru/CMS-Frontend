import React, { useState } from "react";
import axios from "axios";

function BudgetForm({ fetchBudgets }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Event",
    proof: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "proof") {
      setFormData({ ...formData, proof: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("amount", formData.amount);
    data.append("category", formData.category);
    data.append("proof", formData.proof);

    try {
      await axios.post("http://localhost:5000/upload", data);
      alert("Budget uploaded successfully!");
      fetchBudgets();
    } catch (error) {
      console.error("Error uploading budget", error);
    }
  };

  return (
    <div>
      <h3>Upload New Budget</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required /><br />
        <input type="number" name="amount" placeholder="Amount" onChange={handleChange} required /><br />
        <select name="category" onChange={handleChange}>
          <option value="Event">Event</option>
          <option value="Department">Department</option>
          <option value="Mess">Mess</option>
        </select><br />
        <input type="file" name="proof" onChange={handleChange} required /><br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default BudgetForm;
