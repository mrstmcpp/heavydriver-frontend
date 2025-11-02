import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomInput from "../../../resusables/CustomInput";
import YellowButton from "../../../resusables/YellowButton";
import axios from "axios";
import PageMeta from "../../common/PageMeta";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!name || !email || !password || !confirmPassword || !phoneNumber) {
      return setError("All fields are required");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (!agreeTerms) {
      return setError("You must accept the terms & conditions");
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_AUTH_BACKEND_URL}/signup/passenger`,
        {
          name,
          email,
          password,
          confirmPassword,
          phoneNumber,
        }
      );

      console.log("Registration successful:", res.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Try again.");
    }
  };

  return (
    <>
      <PageMeta page={"register"} />
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="bg-gray-800 p-8 space-y-4 rounded-lg w-full max-w-md shadow-md">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
            Register
          </h2>

          {error && (
            <p className="text-red-400 text-sm text-center mb-2 font-medium">
              {error}
            </p>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <CustomInput
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />

            <CustomInput
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
            />

            <CustomInput
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              placeholder="Enter your phone number"
              required
            />

            <CustomInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Create a password"
              required
            />

            <CustomInput
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm your password"
              required
            />

            <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className="accent-yellow-400 cursor-pointer"
              />
              <span>
                I agree to the{" "}
                <span className="text-yellow-400 underline cursor-pointer">
                  Terms & Conditions
                </span>
              </span>
            </div>

            <YellowButton
              type="submit"
              className="w-full mt-4"
              disabled={!agreeTerms}
            >
              Create Account
            </YellowButton>
          </form>

          <p className="text-white text-sm text-center">
            Already have an account?{" "}
            <span
              className="text-yellow-400 cursor-pointer underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
