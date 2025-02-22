import React, { useState } from "react";

const ApplicationForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Event");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userId = localStorage.getItem("userId"); // Fetch userId from localStorage
  
    if (!userId) {
      alert("User not logged in. Please log in first.");
      return;
    }
  
    console.log("Submitting:", { userId, title, description, category }); // Debugging
  
    const response = await fetch("http://localhost:5000/submit_application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId, // Send userId
        title,
        description,
        category, // Ensure category is sent
      }),
    });
  
    const result = await response.json();
  
    if (response.ok) {
      alert(result.message);
      setTitle("");
      setDescription("");
      setCategory("Event");
    } else {
      alert(result.error || "Something went wrong!");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
     <select value={category} onChange={(e) => setCategory(e.target.value)}>
  <option value="" >Select Category</option> 
  <option value="Event Organization">Event Organization</option>
  <option value="Budget Approval">Budget Approval</option>
  <option value="Sponsorship">Sponsorship</option>
</select>


      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplicationForm;
