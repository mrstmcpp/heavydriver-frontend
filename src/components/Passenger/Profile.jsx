import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CarLoader from "../../resusables/CarLoader";
import defaultDP from "../../assets/user.png";
import YellowButton from "../../resusables/YellowButton";
import { PageTopBanner } from "../PageTopBanner";
import { InfoCard } from "../../resusables/InfoCard";
import PageMeta from "../common/PageMeta";

const PassengerProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [passenger, setPassenger] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_AUTH_BACKEND_URL}/details`,
          { withCredentials: true }
        );
        setPassenger(res.data);
      } catch (err) {
        console.error("Error fetching passenger profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <CarLoader message="Loading your profile..." />;

  if (!passenger) {
    return (
      <div className="p-6 text-center text-gray-700 dark:text-yellow-400">
        Failed to load profile. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <PageMeta page={"profile"} />
      <PageTopBanner section="Profile" />

      <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative w-full bg-gray-900 rounded-2xl shadow-2xl border border-yellow-500/20 p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-yellow-500/10 blur-3xl pointer-events-none"></div>

            {/* Header */}
            <div className="relative flex flex-col items-center text-center mb-10">
              <div className="relative group">
                <img
                  src={passenger.profileImage || defaultDP}
                  alt="Profile"
                  className="h-28 w-28 rounded-full object-cover border-4 border-yellow-400 shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  className="absolute bottom-0 right-0 bg-yellow-400 text-gray-900 p-1.5 rounded-full shadow-md text-xs font-semibold hover:bg-yellow-300 transition"
                  title="Change photo"
                >
                  <i className="pi pi-camera"></i>
                </button>
              </div>

              <h1 className="mt-4 text-3xl font-bold text-yellow-400">
                {passenger.name}
              </h1>
              <p className="text-gray-400">{passenger.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                {passenger.city || "No city selected"}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <InfoCard label="Role" value={passenger.role} icon="pi pi-user" />
              <InfoCard
                label="Phone"
                value={passenger.phoneNumber}
                icon="pi pi-phone"
              />
              <InfoCard
                label="Total Rides"
                value={passenger.totalRides || 0}
                icon="pi pi-car"
              />
              <InfoCard
                label="Registered On"
                value={
                  passenger.createdAt
                    ? new Date(passenger.createdAt).toLocaleDateString()
                    : "N/A"
                }
                icon="pi pi-calendar"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <YellowButton onClick={() => navigate("/profile/edit")}>
                <i className="pi pi-user-edit mr-2" />
                Edit Profile
              </YellowButton>

              <YellowButton
                onClick={() => navigate("/profile/change-password")}
                className="!bg-gray-800 hover:!bg-gray-700 text-yellow-400 border border-yellow-400"
              >
                <i className="pi pi-lock mr-2" />
                Change Password
              </YellowButton>

              <YellowButton
                onClick={() => navigate("/rides/all")}
                className="!bg-yellow-400 hover:!bg-yellow-300 text-gray-900"
              >
                <i className="pi pi-history mr-2" />
                Ride History
              </YellowButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PassengerProfilePage;
