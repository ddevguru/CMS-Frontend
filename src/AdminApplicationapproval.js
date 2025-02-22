import React, { useEffect, useState } from "react";

const AdminApplicationapproval = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/applications")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setApplications(data);
        } else {
          console.error("Invalid data format", data);
          setApplications([]); // Ensure applications is always an array
        }
      })
      .catch((error) => console.error("Error fetching applications:", error));
  }, []);

  const handleApproval = async (appId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/update_application/${appId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Application updated:", data);

      // Update UI after approval/rejection
      setApplications((prev) =>
        prev.map((app) =>
          app.id === appId ? { ...app, status } : app
        )
      );
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  return (
    <div>
      <h2>Admin Approval Panel</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Applicant Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.applicant_name}</td> {/* Displaying applicant name */}
              <td>{app.title}</td>
              <td>{app.description}</td>
              <td>{app.category}</td>
              <td>{app.status}</td>
              <td>
                {app.status === "Pending" && (
                  <>
                    <button onClick={() => handleApproval(app.id, "Approved")}>✅ Approve</button>
                    <button onClick={() => handleApproval(app.id, "Rejected")}>❌ Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminApplicationapproval;
