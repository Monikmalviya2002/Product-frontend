import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Bgphoto from "../assets/image.png";

const BASE_URL = "https://product-backend-5.onrender.com";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      // Only email payload
      const payload = { emailId: email.trim() };

      await axios.post(`${BASE_URL}/api/send-otp`, payload, {
        withCredentials: true,
      });

      navigate("/otp");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left image */}
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <div className="w-[480px] h-[520px] rounded-xl overflow-hidden shadow-md">
          <img
            src={Bgphoto}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 lg:px-24">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-8 text-center lg:text-left">
            Login to your Productr Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Email Id
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your EmailId"
                className="w-full px-3 py-2 border rounded-md text-sm
                           focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-950 text-white rounded-md
                         text-sm font-medium cursor-pointer disabled:opacity-60"
            >
              {loading ? "Sending OTP..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
