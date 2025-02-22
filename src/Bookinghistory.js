import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("http://localhost:5000/booking");

                if (response.data && Array.isArray(response.data.bookings)) {
                    setBookings(response.data.bookings);
                } else {
                    setBookings([]); // Handle unexpected response structure
                }
            } catch (err) {
                setError("Error fetching bookings.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>All Booking History</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>Facility</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Duration</th>
                        <th>End Time</th>
                        <th>Created At</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.user_name}</td>
                                <td>{booking.user_email}</td>
                                <td>{booking.facility_id}</td>
                                <td>{booking.booking_date}</td>
                                <td>{booking.booking_time}</td>
                                <td>{booking.duration} .Hrs</td>
                                <td>{booking.booking_end_time}</td>
                                <td>{booking.created_at}</td>
                              
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10">No bookings found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookingHistory;
