import { useState } from "react";
import CustomInput from "../../../resusables/CustomInput";
import YellowButton from "../../../resusables/YellowButton";
import { useNavigate } from "react-router-dom";

const DriverLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // TODO: Send login request to backend
    console.log("Driver login:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#111] p-8 rounded-lg w-full max-w-md shadow-md">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Driver Login
        </h2>

        <CustomInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
        />

        <CustomInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
        />

        <YellowButton onClick={handleLogin} className="w-full mb-4">
          Login as Driver
        </YellowButton>

        <p className="text-white text-sm text-center">
          Not registered?{" "}
          <span
            className="text-yellow-400 cursor-pointer underline"
            onClick={() => navigate("/register-driver")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default DriverLogin;
