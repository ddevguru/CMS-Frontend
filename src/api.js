import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getFacilities = async () => {
    return axios.get(`${API_URL}/facilities`);
};


export const bookFacility = async (bookingData) => {
    try {
        console.log("📤 Sending Booking Request:", bookingData);

        const response = await axios.post(`${API_URL}/book`, bookingData, {
            headers: { "Content-Type": "application/json" },
        });

        console.log("✅ Booking Success Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("🚨 API Error Response:", error.response?.data);
        throw error;
    }
};

