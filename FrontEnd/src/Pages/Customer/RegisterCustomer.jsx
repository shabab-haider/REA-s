"use client";

import { useContext, useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  ArrowLeft,
  CheckCircle,
  Shield,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import registerUser from "/Images/Login.png";
import Logo from "../../Components/Logo";
import axios from "axios";
import { CustomerDataContext } from "../../../context/CustomerContext";

const RegisterCustomer = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { customer, setCustomer } = useContext(CustomerDataContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      alert("Confirm Your Password");
      setIsLoading(false);
      return;
    }

    const customerData = {
      fullname: fullName,
      email,
      password,
      contactNo,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/customers/register`,
        customerData
      );

      if (response.status === 200) {
        setCustomer(response.data.customer);
        localStorage.setItem("token", response.data.token);
        navigate("/customer-dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
      // Handle error (you can add error state here)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Section - Registration Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-6 lg:px-16">
        <div className="max-w-md mx-auto w-full">
          {/* Header with Logo and Back Button */}
          <div className="mb-12">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>

            <div className="flex items-center justify-center mb-8">
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
              Create Your Account
            </h1>
            <p className="text-lg text-gray-600">
              Join REA's Planning to start creating your perfect event
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Address */}
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
                  name="email"
                  type="email"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Contact Number */}
            <div>
              <label
                htmlFor="contactNo"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contact Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="contactNo"
                  name="contactNo"
                  type="tel"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="Enter your contact number"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 text-white py-3 px-4 rounded-xl transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-3">Already have an account?</p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center w-full py-3 px-4 border-2 border-pink-600 text-pink-600 rounded-xl hover:bg-pink-50 transition-all duration-200 font-semibold"
            >
              Sign In to Your Account
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section - Image and Benefits */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={registerUser || "/placeholder.svg"}
            alt="Registration illustration"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-purple-600/20"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md">
            <h2 className="text-3xl font-bold mb-6">
              Welcome to REA's Planning
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join thousands of satisfied customers who trust us with their
              special events
            </p>

            {/* Benefits */}
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-sm">Easy booking process</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-sm">Trusted vendors only</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-sm">24/7 customer support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCustomer;
