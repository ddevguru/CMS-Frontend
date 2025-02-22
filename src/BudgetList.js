import React, { useState, useEffect } from "react";
import axios from "axios";

const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get_budgets");
      if (response.data && Array.isArray(response.data)) {
        setBudgets(response.data);
      } else {
        setBudgets([]);
      }
    } catch (error) {
      console.error("Error fetching budgets", error);
      setBudgets([]);
    }
  };

  return (
    <div>
      <h2>All Budgets & Sponsorships</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Proof</th>
          </tr>
        </thead>
        <tbody>
          {budgets.length > 0 ? (
            budgets.map((budget) => (
              <tr key={budget.id}>
                <td>{budget.title}</td>
                <td>Rs. {budget.amount}</td>
                <td>{budget.category}</td>
                <td>
                  <a href={`http://localhost:5000/uploads/${budget.proof}`} target="_blank" rel="noopener noreferrer">
                    View Proof
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No budgets available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetList;
