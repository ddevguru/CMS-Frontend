import React, { useEffect, useState } from "react";
import { getFacilities, bookFacility } from "./api";

const BookingPage = () => {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [duration, setDuration] = useState(1); // Default 1 hour
    const [user, setUser] = useState({ name: "", email: "" });

    useEffect(() => {
        const storedUser = {
            name: localStorage.getItem("name") || "Unknown User",
            email: localStorage.getItem("email") || "Unknown Email",
        };
        setUser(storedUser);
        fetchFacilities();
    }, []);

    const fetchFacilities = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getFacilities();

            if (response && response.data && Array.isArray(response.data.data)) {
                setFacilities(response.data.data);
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

    const handleBooking = async () => {
        if (!selectedFacility || !bookingDate || !bookingTime || !duration) {
            alert("Please select a facility, date, time, and duration.");
            return;
        }

        const userData = {
            user_name: localStorage.getItem("name")?.trim() || "",
            user_email: localStorage.getItem("email")?.trim() || "",
        };

        const bookingData = {
            user_name: userData.user_name,
            user_email: userData.user_email,
            facility_id: selectedFacility,
            booking_date: bookingDate,
            booking_time: bookingTime,
            duration: duration, // Include duration in the request
        };

        try {
            const response = await bookFacility(bookingData);
            alert("Booking successful!");
            setSelectedFacility(null);
            setBookingDate("");
            setBookingTime("");
            setDuration(1);
            fetchFacilities();
        } catch (error) {
            console.error("Booking Error:", error.response?.data);
            alert(error.response?.data?.message || "Booking failed.");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <h1>College Facility Booking</h1>

            {loading ? (
                <p>Loading facilities...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : facilities.length === 0 ? (
                <p>No facilities available.</p>
            ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {facilities.map((facility) => (
                        <li 
                            key={facility.id} 
                            style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
                        >
                            <strong>{facility.name}</strong> - {facility.status}
                            {facility.status === "available" && (
                                <button 
                                    onClick={() => setSelectedFacility(facility.id)}
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
                                    Book
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {selectedFacility && (
                <div 
                    style={{
                        marginTop: "20px",
                        padding: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        backgroundColor: "#f9f9f9"
                    }}
                >
                    <h2>Confirm Booking</h2>
                    <p><strong>Facility:</strong> {facilities.find(f => f.id === selectedFacility)?.name}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>

                    <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
                    <input type="time" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} />
                    <input type="number" min="1" max="5" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (hours)" />
                    
                    <button onClick={handleBooking} disabled={!bookingDate || !bookingTime || !duration}>
                        Confirm Booking
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookingPage;
