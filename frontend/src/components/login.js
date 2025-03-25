import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config.js";
import { useAuth } from "./AuthContext"; // ✅ Move this to the top

const BaseURL = config.BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("mentee");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Correctly placed

  const handleSubmit = async (e) => {
    e.preventDefault();
    const path =
      userType === "mentor"
        ? `${BaseURL}/mentor/signin`
        : `${BaseURL}/mentee/signin`;

    try {
      const response = await axios.post(path, { email, password });

      if (response.status === 200) {
        const { token, userName } = response.data; // ✅ Correctly extract `data`
        login(token, userType, userName); // ✅ Use extracted variables
        navigate("/");
      } else {
        setError(response.data.error || "Login failed. Please try again."); // ✅ Use response.data
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Left Side */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100 p-6 rounded-lg shadow">
        <Link to="/">
          <img src="/path/to/your/logo.svg" alt="Logo" className="w-24 h-24" />
        </Link>
      </div>

      {/* Right Side */}
      <div className="w-1/2 p-8">
        <h1 className="text-3xl font-bold mb-6">Sign In</h1>

        {/* User Type Selection */}
        <div className="flex mb-4">
          <button
            className={`border p-2 rounded-md mr-2 ${
              userType === "mentee"
                ? "bg-slate-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setUserType("mentee")}
          >
            I'm a Mentee
          </button>
          <button
            className={`border p-2 rounded-md ${
              userType === "mentor"
                ? "bg-slate-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setUserType("mentor")}
          >
            I'm a Mentor
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-slate-600 text-white py-2 rounded-md"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
