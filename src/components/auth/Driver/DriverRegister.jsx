import { useState } from "react";
import CustomInput from "../../../resusables/CustomInput";
import YellowButton from "../../../resusables/YellowButton";
import { useNavigate } from "react-router-dom";

const DriverRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    vehicleNumber: "",
    vehicleType: "",
    licenseNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // TODO: Send form to backend API
    console.log("Driver Register:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#111] p-8 rounded-lg w-full max-w-md shadow-md">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Driver Registration
        </h2>

        <CustomInput
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
        />

        <CustomInput
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Enter your email"
        />

        <CustomInput
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Create a password"
        />

        <CustomInput
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
        />

        <CustomInput
          label="Vehicle Number"
          name="vehicleNumber"
          value={form.vehicleNumber}
          onChange={handleChange}
          placeholder="Eg: MH12AB1234"
        />

        <CustomInput
          label="Vehicle Type"
          name="vehicleType"
          value={form.vehicleType}
          onChange={handleChange}
          placeholder="Eg: Sedan, SUV, Auto"
        />

        <CustomInput
          label="License Number"
          name="licenseNumber"
          value={form.licenseNumber}
          onChange={handleChange}
          placeholder="DLXXXXXXXXX"
        />

        <YellowButton onClick={handleSubmit} className="w-full mb-4">
          Register as Driver
        </YellowButton>

        <p className="text-white text-sm text-center">
          Already registered?{" "}
          <span
            className="text-yellow-400 cursor-pointer underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default DriverRegister;
