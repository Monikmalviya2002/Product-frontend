import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Bgphoto from "../assets/image.png";

const BASE_URL = "https://product-backend-2-uwao.onrender.com/";

const VerifyOtp = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp.trim()) {
      setError("Please enter OTP");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${BASE_URL}/api/verify-otp`,
        { otp },
        { withCredentials: true }
      );

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      
     
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <div className="w-[480px] h-[520px] rounded-xl overflow-hidden shadow-md">
          <img
            src={Bgphoto}
            alt="Verify OTP"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-24">
        <div className="w-full max-w-md">

          <h1 className="text-3xl font-bold text-[#0F172A] mb-6">
            Verify OTP
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6 digit OTP"
                className="w-full px-3 py-2 border rounded-md text-sm
                           focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-950 text-white rounded-md
                         text-sm font-medium disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Didn’t receive OTP?{" "}
            <button className="text-blue-600 hover:underline">
              Resend OTP
            </button>
          </p>

        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
 