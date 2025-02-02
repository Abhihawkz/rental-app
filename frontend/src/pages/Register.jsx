import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phNumber: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.user);
      setSuccessMessage(response.data.message);
      setError("");
      setFormData({
        username: "",
        email: "",
        password: "",
        phNumber: "",
      });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "An error occurred while registering"
        );
      } else {
        setError("Network error or server down");
      }
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="w-full max-w-xs sm:max-w-sm p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-300 transition-all duration-300 ease-in-out transform hover:scale-101">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-800 text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-800 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-800 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="phNumber"
              className="block text-gray-800 text-sm font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phNumber"
              name="phNumber"
              value={formData.phNumber}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

        {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
        {successMessage && (
          <div className="mt-4 text-green-600 text-sm">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Register;
