import React, { useState } from "react";
import axios from "axios";

const DoctorForm = () => {
  const [formData, setFormData] = useState({
    student_name: "",
    age: "",
    symptoms: "",
    diagnosis: "",
    prescribed_medicine: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/add_report", formData);
      alert("Report submitted successfully");
      setFormData({
        student_name: "",
        age: "",
        symptoms: "",
        diagnosis: "",
        prescribed_medicine: "",
        remarks: "",
      });
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <div className="container">
      <h2>Student Sick Report</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="student_name" placeholder="Student Name" value={formData.student_name} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
        <textarea name="symptoms" placeholder="Symptoms" value={formData.symptoms} onChange={handleChange} required />
        <textarea name="diagnosis" placeholder="Diagnosis" value={formData.diagnosis} onChange={handleChange} required />
        <textarea name="prescribed_medicine" placeholder="Prescribed Medicine" value={formData.prescribed_medicine} onChange={handleChange} required />
        <textarea name="remarks" placeholder="Remarks" value={formData.remarks} onChange={handleChange} required />
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default DoctorForm;
