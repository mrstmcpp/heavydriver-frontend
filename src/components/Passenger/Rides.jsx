import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Paginator } from "primereact/paginator";
import axios from "axios";
import CarLoader from "../../resusables/CarLoader";
import BookingsTable from "../../resusables/BookingsTable";
import useAuthStore from "../../hooks/useAuthStore";
import { PageTopBanner } from "../PageTopBanner";
import PageMeta from "../common/PageMeta";

const PassengerRides = () => {
  const { authUser, loading: authLoading } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 0;
  const size = parseInt(searchParams.get("size")) || 10;

  const [first, setFirst] = useState(page * size);
  const [rows, setRows] = useState(size);

  useEffect(() => {
    if (!searchParams.get("page") || !searchParams.get("size")) {
      setSearchParams({ page: 0, size: 10 });
    }
  }, []);

  const fetchPassengerBookings = async (pageNumber, pageSize) => {
    if (!authUser?.userId) return;

    setBookingsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BOOKING_BACKEND_URL}/passenger/all-booking?offset=${pageNumber}&pageSize=${pageSize}`,
        {
          withCredentials: true,
          
        }
      );

      const data = response.data;
      console.log("Fetched passenger bookings:", data);
      setBookings(data.bookingList || []);
      setTotalItems(data.totalItems || 0);
    } catch (err) {
      console.error("Error fetching passenger bookings:", err);
    } finally {
      setBookingsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && authUser?.userId) {
      fetchPassengerBookings(page, size);
    }
  }, [authLoading, authUser, page, size]);

  const onPageChange = (event) => {
    const newPage = event.first / event.rows;
    const newSize = event.rows;
    setFirst(event.first);
    setRows(event.rows);
    setSearchParams({ page: newPage, size: newSize });
  };

  if (authLoading || bookingsLoading) {
    return <CarLoader message="Loading your rides..." />;
  }

  if (!authUser) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        Please log in to view your rides.
      </div>
    );
  }

  return (
    <>
      <PageMeta page={"myRides"}/>

      <PageTopBanner section="My Rides" />
      <div className="bg-gray-900 text-yellow-400 flex justify-center">
        <div className="w-full max-w-6xl py-10 px-6">
          <p className="text-sm mb-6 text-center">
            Total Rides: {totalItems}
          </p>

          {bookings.length > 0 ? (
            <>
              <BookingsTable bookings={bookings} loading={bookingsLoading} />

              <div className="flex justify-center mt-6">
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={totalItems}
                  rowsPerPageOptions={[10, 20, 30]}
                  onPageChange={onPageChange}
                />
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-20">
              No rides found yet. Book your first ride!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PassengerRides;
