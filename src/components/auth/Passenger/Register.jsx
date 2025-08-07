import { useState } from "react";
import CustomInput from "../../../resusables/CustomInput";
import YellowButton from "../../../resusables/YellowButton";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    // TODO: API call
    console.log("Registering:", { name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#111] p-8 rounded-lg w-full max-w-md shadow-md">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Register</h2>

        <CustomInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
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
          placeholder="Create a password"
        />

        <YellowButton onClick={handleRegister} className="w-full mb-4">
          Create Account
        </YellowButton>

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
  );
};

export default Register;
