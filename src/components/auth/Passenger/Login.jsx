import { useState , useRef } from "react";
import CustomInput from "../../../resusables/CustomInput";
import YellowButton from "../../../resusables/YellowButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast } from 'primereact/toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null);


  const handleLogin = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_AUTH_BACKEND_URL}/signin`,
        { email, password, role: "PASSENGER" }
      );
      toast.current.show({severity:'success', summary: 'Success', detail:'Login successful', life: 3000});
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.current.show({severity:'error', summary: 'Error', detail:'Login failed', life: 3000});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#111] p-8 rounded-lg w-full max-w-md shadow-md">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Login
        </h2>
        <Toast ref={toast} />
        <div className="space-y-5">
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
        </div>

        <YellowButton onClick={handleLogin} className="w-full mt-6">
          Sign In
        </YellowButton>

        <p className="text-white text-sm text-center mt-4">
          Don't have an account?{" "}
          <span
            className="text-yellow-400 cursor-pointer underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
