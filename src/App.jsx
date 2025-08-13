import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import HomePage from "./pages/Homepage";
import Layout from "./layout/Layout";
import "./App.css";
import "primereact/resources/themes/viva-dark/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Engineering from "./pages/Engineering";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/404";
import BookRide from "./core/BookRide";
import Login from "./components/auth/Passenger/Login";
import Register from "./components/auth/Passenger/Register";
import Slider from "./components/slider/Slider";
import ScrollToTop from "./resusables/ScrollToTop";
import MeetTheManBehind from "./pages/MeetTheManBehind";
import useAuthStore from "./hooks/useAuthStore";
import PublicRoute from "./components/PublicRoutes";

axios.defaults.withCredentials = true;
function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
          <Route path="book" element={<BookRide />} />
          <Route path="slidertest" element={<Slider />} />
          <Route path="meet-the-man-behind" element={<MeetTheManBehind />} />

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
