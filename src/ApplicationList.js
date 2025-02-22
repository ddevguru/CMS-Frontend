import React, { useEffect, useState } from "react";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:5000/application"); // ✅ Fixed API URL
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <h2>All Applications</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Applicant Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((app) => (
              <tr key={app.id}>
                <td>{app.applicant_name}</td> {/* Displaying applicant name */}
                <td>{app.title}</td>
                <td>{app.description}</td>
                <td>{app.category}</td>
                <td>{app.status}</td>
                <td>{new Date(app.created_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No applications found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationList;
