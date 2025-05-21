// src/pages/Signup.tsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5050";

const Signup: React.FC = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/auth/signUp`, user);

      if (response.data) {
        alert("Sign up successful");
        navigate("/login");
      }
      console.log(response.data);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        alert("Email already exists");
      } else {
        alert("Sign up failed");
        console.log("Sign up failed", { error });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 flex flex-col items-center justify-center">
      <div className="bg-white/80 shadow-xl rounded-3xl px-10 py-12 max-w-md w-full mt-10">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-700 drop-shadow">
          Sign Up
        </h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <input
            value={user.name}
            onChange={handleChange}
            placeholder="Enter your name"
            name="name"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
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
            Sign Up
          </button>
        </form>
        <div className="text-center mt-6 text-gray-600">
          Already have an account?
          <Link to="/login" className="ml-2 text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
