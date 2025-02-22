import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const UserBookings = () => {
    const params = useParams();
    console.log("🔍 Params Object:", params);

    let { userId } = params;
    console.log("✅ Extracted userId:", userId);

    const [bookings, setBookings] = useState([]); // ✅ Hooks must be at the top

    useEffect(() => {
        if (!userId || userId.includes("${")) {
            console.error("❌ Invalid User ID detected:", userId);
            return;
        }

        axios.get(`http://localhost:5000/my-bookings/${userId}`)
            .then((response) => {
                setBookings(response.data);
            })
            .catch((error) => {
                console.error("❌ Error fetching bookings:", error);
            });
    }, [userId]);

    // ✅ Return happens after hooks
    if (!userId || userId.includes("${")) {
        return <h2>Error: Invalid User ID</h2>;
    }

    return (
        <div>
            <h1>User Bookings</h1>
            {bookings.length === 0 ? <p>No bookings found.</p> : <pre>{JSON.stringify(bookings, null, 2)}</pre>}
        </div>
    );
};

export default UserBookings;
