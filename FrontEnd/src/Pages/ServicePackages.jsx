import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  ArrowLeft,
  Calendar,
  Star,
  MapPin,
  Phone,
  Camera,
  Heart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Components/Logo";
import BackButton from "../Components/BackButton";

const ServicePackages = () => {
  const { vendorId } = useParams();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/vendors/${vendorId}/packages`
        );
        setPackages(res.data.packages);
      } catch (err) {
        console.error("Failed to load packages:", err);
      }
    };
    fetchPackages();
  }, [vendorId]);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // Available time slots
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ];

  const handlePackageSelect = (packageData) => {
    setSelectedPackage(packageData);
    setShowBookingForm(true);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const data = {
      title: selectedPackage.title,
      pricing: selectedPackage.price,
      date: selectedDate,
      contact,
      location,
      description,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/bookings/create/${vendorId}`,
        data
      );
      console.log("Booking Successful:", response.data.booking);
    } catch (error) {
      console.error("Booking Failed:", error.response?.data || error.message);
    }
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowBookingForm(false);
      setSelectedPackage(null);
      setSelectedDate("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <BackButton />
            <div className="flex items-center space-x-2">
              <div className="w-6 h-8 rounded-lg flex items-center justify-center">
                <Logo />
              </div>
              <span className="text-xl font-bold text-gray-800">
                REA's Planning
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Packages Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Choose Your Package
            </h2>
            <p className="text-lg text-gray-600">
              Select the perfect package for your event
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-xl shadow-sm border-2 transition-all duration-200 hover:shadow-md h-[420px] flex flex-col justify-between"
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Package Header */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {pkg.title}
                    </h3>
                    <div>
                      <span className="text-2xl font-bold text-gray-800">
                        {pkg.price}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="my-4 flex-grow overflow-hidden">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Select Button */}
                  <button
                    onClick={() => handlePackageSelect(pkg)}
                    className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 bg-pink-500 text-white hover:bg-pink-600"
                  >
                    Select Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
      </div>

      {/* Booking Modal */}
      {showBookingForm && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Book Your Service
                </h3>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Selected Package Info */}
              <div className="bg-pink-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-1">
                  {selectedPackage.title}
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  {selectedPackage.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-pink-600">
                    {selectedPackage.price}
                  </span>
                  <span className="text-sm text-gray-600">
                    {selectedPackage.duration}
                  </span>
                </div>
              </div>

              <form onSubmit={handleBooking} className="space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Select Event Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                    }}
                  />
                </div>
                {/* Event Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Event Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Event Location"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Event Details (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder="Brief details about your event..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      !selectedDate || !contact || !location || isLoading
                    }
                    className="flex-1 py-3 px-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Booking...
                      </div>
                    ) : (
                      "Send Booking Request"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePackages;
