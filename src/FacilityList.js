import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FacilityList = () => {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const response = await fetch("http://localhost:5000/facilities");
                const data = await response.json();
                
                console.log("API Response:", data);

                if (response.ok && Array.isArray(data.data)) {
                    setFacilities(data.data);
                } else {
                    setFacilities([]);
                    setError("No available facilities found.");
                }
            } catch (error) {
                console.error("Error fetching facilities:", error);
                setError("Failed to fetch facilities. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchFacilities();
    }, []);

    const handleBookNow = (facilityId) => {
        navigate(`/book?facilityId=${facilityId}`);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <h2>Available Facilities</h2>

            {loading ? (
                <p>Loading facilities...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : facilities.length === 0 ? (
                <p>No facilities available.</p>
            ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {facilities.map((facility) => (
                        <li key={facility.id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
                            <strong>{facility.name}</strong> - {facility.status}
                            {facility.status === "available" && (
                                <button 
                                    onClick={() => handleBookNow(facility.id)}
                                    style={{
                                        marginLeft: "10px",
                                        padding: "5px 10px",
                                        backgroundColor: "#007bff",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Book Slot
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FacilityList;
