import React, { useState, useEffect } from "react";
import axios from "axios";

const Facilities = () => {
    const [facilities, setFacilities] = useState([]);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFacilities();
    }, []);

    const fetchFacilities = async () => {
        try {
            const response = await axios.get("http://localhost:5000/facility");
            setFacilities(response.data.facilities);
        } catch (err) {
            setError("Error fetching facilities.");
        } finally {
            setLoading(false);
        }
    };

    const addFacility = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/facilitie", {
                name,
                status,
                description,
            });

            alert(response.data.message);
            fetchFacilities(); // Refresh list after adding
            setName("");
            setStatus("");
            setDescription("");
        } catch (err) {
            setError("Error adding facility.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Facilities</h2>
            
            {/* Facility Form */}
            <form onSubmit={addFacility}>
                <input
                    type="text"
                    placeholder="Facility Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Add Facility</button>
            </form>

            {/* Facility List */}
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {facilities.length > 0 ? (
                        facilities.map((facility) => (
                            <tr key={facility.id}>
                                <td>{facility.id}</td>
                                <td>{facility.name}</td>
                                <td>{facility.status}</td>
                                <td>{facility.description}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No facilities found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Facilities;
