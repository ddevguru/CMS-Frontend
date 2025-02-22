import React, { useEffect, useState } from "react";
import axios from "axios";

const Bookignrequest = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:5000/bookings");
            console.log("API Response:", response.data); // Debugging line
    
            // Ensure we correctly access the array inside the response
            if (Array.isArray(response.data.bookings)) {
                setBookings(response.data.bookings);
            } else {
                setBookings([]); // Set an empty array if the response is not as expected
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
            setBookings([]); // Prevent issues when the API fails
        }
    };
    

    const handleAction = async (id, action) => {
        try {
            await axios.post("http://localhost:5000/approve_booking", {
                booking_id: id,
                action: action,
            });

            alert(`Booking ${action}d successfully.`);
            fetchBookings(); // Refresh bookings list
        } catch (error) {
            console.error(`Error ${action}ing booking:`, error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Admin Panel - Approve Bookings</h2>
            <table border="1" width="100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Facility</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.user_name}</td>
                            <td>{booking.user_email}</td>
                            <td>{booking.facility_id}</td>
                            <td>{booking.booking_date}</td>
                            <td>{booking.booking_time}</td>
                            <td>{booking.status}</td>
                            <td>
                                {booking.status === "pending" ? (
                                    <>
                                        <button onClick={() => handleAction(booking.id, "approve")} style={{ marginRight: "5px", backgroundColor: "green", color: "white", padding: "5px" }}>
                                            Approve
                                        </button>
                                        <button onClick={() => handleAction(booking.id, "reject")} style={{ backgroundColor: "red", color: "white", padding: "5px" }}>
                                            Reject
                                        </button>
                                    </>
                                ) : (
                                    <span>{booking.status}</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Bookignrequest;
