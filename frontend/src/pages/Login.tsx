import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import type { AuthContextType } from "../types";

// const BASE_URL = "http://localhost:5050";

const Login: React.FC = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext) as AuthContextType;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(user);
      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
      console.log("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 flex flex-col items-center justify-center">
      <div className="bg-white/80 shadow-xl rounded-3xl px-10 py-12 max-w-md w-full mt-10">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-700 drop-shadow">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            value={user.email}
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            value={user.password}
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6 text-gray-600">
          Don't have an account?
          <Link to="/signup" className="ml-2 text-blue-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
