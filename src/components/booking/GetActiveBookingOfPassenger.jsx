import axios from "axios";


export const GetActiveBookingOfPassenger = async (passengerId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BOOKING_BACKEND_URL}/booking/active/${passengerId}`
    );
    console.log("Active booking fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching active booking:", error);
    throw error;
  }
};
