"use client";

import { useContext, useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Lock,
  Briefcase,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import registerVendor from "/Images/registerVendor.png";
import Logo from "../../Components/Logo";
import axios from "axios";
import { VendorDataContext } from "../../../context/VendorContext";
import BackButton from "../../Components/BackButton";

const RegisterVendor = () => {
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { vendor, setVendor } = useContext(VendorDataContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const vendorData = {
      fullname: fullName,
      email,
      password,
      serviceType,
      phoneNumber,
    };

    if (password !== confirmPassword) {
      alert("Confirm Your Password");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/vendors/register`,
        vendorData
      );

      if (response.status === 200) {
        setVendor(response.data.vendor);
        localStorage.setItem("token", response.data.token);
        navigate("/service-creation");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8">
                <Logo />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                REA's Planning
              </span>
            </Link>

            <BackButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Register Your Business
                </h1>
                <p className="text-lg text-gray-600">
                  Join our network of trusted vendors and grow your business
                </p>
              </div>

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
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Service Type */}
                <div>
                  <label
                    htmlFor="serviceType"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Service Type
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="serviceType"
                      name="serviceType"
                      className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none transition-all duration-200 bg-white"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select service type
                      </option>
                      <option value="venue">Venue</option>
                      <option value="photography">Photography</option>
                      <option value="salon">salon</option>
                      <option value="transportation">Transportation</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
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
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
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
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
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
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
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
                  className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 text-white py-4 px-6 rounded-xl transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    "Register Business"
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  Already registered?{" "}
                  <Link
                    to="/login"
                    className="text-pink-600 hover:text-pink-700 font-semibold transition-colors"
                  >
                    Login to your account
                  </Link>
                </p>
              </div>
            </div>

            {/* Right Column - Image and Benefits */}
            <div className="hidden md:block space-y-8">
              {/* Image */}
              <div className="relative">
                <img
                  src={registerVendor || "/placeholder.svg"}
                  alt="Business professionals collaborating"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-600/20 to-transparent rounded-2xl"></div>
              </div>

              {/* Benefits */}
              <div className="hidden md:block bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Join REA's Planning?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Expand Your Reach
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Connect with customers across Sialkot and beyond
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Easy Booking Management
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Streamlined system to manage all your bookings
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Trusted Platform
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Join hundreds of verified vendors on our platform
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Grow Your Business
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Access tools and insights to scale your operations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterVendor;
