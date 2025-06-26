"use client";

import { useContext, useState } from "react";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import Logo from "../Components/Logo";
import LoginImage from "/Images/Login.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CustomerDataContext } from "../../context/CustomerContext";
import { VendorDataContext } from "../../context/VendorContext";
import BackButton from "../Components/BackButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { vendor, setVendor } = useContext(VendorDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/vendors/login`,
        { email, password }
      );

      if (response.status === 200) {
        setVendor(response.data.vendor);
        localStorage.setItem("token", response.data.token);
        navigate(`/vendor-dashboard`);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Section - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-6 lg:px-16">
        <div className="max-w-md mx-auto w-full">
          {/* Header with Logo and Back Button */}
          <div className="mb-12 flex flex-row-reverse justify-between items-center">
            <BackButton />

            <div className="flex items-center justify-center mb-1">
              <div className="w-8 h-8 mr-3">
                <Logo />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                REA's Planning
              </span>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Welcome Back!
            </h1>
            <p className="text-lg text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          {/* User Type Toggle - Enhanced Design */}
          {/* <div className="mb-8">
            <p className="text-sm font-medium text-gray-700 mb-3">I am a:</p>
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                type="button"
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  userType === "customer"
                    ? "bg-white text-pink-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setUserType("customer")}
              >
                Customer
              </button>
              <button
                type="button"
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  userType === "vendor"
                    ? "bg-white text-pink-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setUserType("vendor")}
              >
                Vendor
              </button>
            </div>
          </div> */}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 text-white py-3 px-4 rounded-xl transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              Sign In
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="text-center mt-6">
            <a
              href="/forgot-password"
              className="text-gray-600 hover:text-pink-600 transition-colors text-sm font-medium"
            >
              Forgot your password?
            </a>
          </div>

          {/* Register Link */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-3">Don't have an account?</p>
            <Link
              to={`/register-vendor`}
              className="inline-flex items-center justify-center w-full py-3 px-4 border-2 border-pink-600 text-pink-600 rounded-xl hover:bg-pink-50 transition-all duration-200 font-semibold"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={LoginImage || "/placeholder.svg"}
            alt="Login illustration"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-purple-600/20"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md">
            <h2 className="text-3xl font-bold mb-4">Join REA's Planning</h2>
            <p className="text-lg opacity-90 mb-6">
              Connect with trusted vendors and plan your perfect event with ease
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                <span>Trusted Vendors</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                <span>Easy Booking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
