import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import HomePage from "./static/Homepage";
import Layout from "./layout/Layout";
import "./App.css";
import "primereact/resources/themes/viva-dark/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import About from "./static/About";
import Contact from "./static/Contact";
import Engineering from "./static/Engineering";
import FAQ from "./static/FAQ";
import NotFound from "./static/404";
import BookRide from "./components/booking/BookRide";
import Login from "./components/auth/Passenger/Login";
import Register from "./components/auth/Passenger/Register";
import Slider from "./components/slider/Slider";
import ScrollToTop from "./resusables/ScrollToTop";
import MeetTheManBehind from "./static/MeetTheManBehind";
import useAuthStore from "./hooks/useAuthStore";
import PublicRoute from "./components/PublicRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import MapComponent from "./components/maps/MapComponent";
import DriverFinding from "./components/booking/DriverFinding";
import OngoingRide from "./components/booking/OngoingRide";
import CompletedRide from "./components/booking/CompletedBooking";
import CancelledRide from "./components/booking/CancelledBooking";
import GoogleMapsProvider from "./context/GoogleMapsProvider";
import PassengerProfilePage from "./components/Passenger/Profile";
import PassengerRides from "./components/Passenger/Rides";

axios.defaults.withCredentials = true;
function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>

      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="engineering" element={<Engineering />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
          <Route path="slidertest" element={<Slider />} />
          <Route path="maps" element={<MapComponent />} />
          <Route path="meet-the-man-behind" element={<MeetTheManBehind />} />
          <Route path="driver-finding" element={
            <GoogleMapsProvider>

            <DriverFinding />
            </GoogleMapsProvider>
            
            } />

          {/* protected routes start from here */}
          <Route path="/rides/completed/:bookingId" element={<CompletedRide />} />
          <Route path="/rides/cancelled/:bookingId" element={<CancelledRide />} />
          <Route path="rides/all" element={
            <ProtectedRoutes>
              <PassengerRides />
            </ProtectedRoutes>
          } />
          <Route path="rides/new" element={
            <ProtectedRoutes>
              <BookRide />
            </ProtectedRoutes>
          } />

          <Route path="profile" element={
            <ProtectedRoutes>
              <PassengerProfilePage />
            </ProtectedRoutes>
          } />

          <Route path="rides/:bookingId" element={
            <ProtectedRoutes>
              <OngoingRide />
            </ProtectedRoutes>
          } />
      
          {/* public routes starts from here */}
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
