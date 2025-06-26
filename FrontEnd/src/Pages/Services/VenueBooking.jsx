"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Calendar,
  MapPin,
  Star,
  Users,
  Facebook,
  Twitter,
  Instagram,
  Phone,
  Mail,
  Home,
  ChevronRight,
} from "lucide-react";
import Logo from "../../Components/Logo";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../../Components/BackButton";
import axios from "axios";

const VenueBooking = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [venues, setVenues] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    if (!selectedDate) return; // wait for selectedDate

    const fetchAvailableVendors = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/vendors/available-vendors`,
          { date: selectedDate, serviceType: "venue" }
        );
        setVendors(response.data.vendors);
        console.log(response.data.vendors);
      } catch (error) {
        console.error("Failed to fetch available vendors:", error);
      }
    };

    fetchAvailableVendors();
  }, [selectedDate]);

  useEffect(() => {
    const getVenues = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/vendors/venues`
      );
      setVenues(response.data.venues);
    };
    getVenues();
  }, []);

  useEffect(() => {
    if (!venues.length || !vendors.length) return;

    const updatedVenues = venues.map((venue) => {
      const match = vendors.find((v) => v.id === venue.id);
      return {
        ...venue,
        available: match?.available ?? true, // if not found, assume available
      };
    });

    setVenues(updatedVenues);
  }, [vendors, venues]);
  

  const [searchTerm, setSearchTerm] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const navigate = useNavigate();

  // Filter venues based on search and availability
  const filteredVenues = venues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAvailability = !showAvailableOnly || venue.available;
    console.log(venue);
    return matchesSearch && matchesAvailability;
  });
  const handleBooking = (vendorId) => {
    navigate(`/service-packages/${vendorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5">
                <Logo />
              </div>
              <span className="text-xl font-bold text-gray-800">
                REA's Planning
              </span>
            </div>

            <BackButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Venues</h1>
          <p className="text-gray-600">
            Find and Book the Perfect Venue for your Special Day
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search Venues....."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Date Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Available Only Filter */}
            <button
              onClick={() => setShowAvailableOnly(!showAvailableOnly)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                showAvailableOnly
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Available Only
            </button>
          </div>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Venue Image */}
              <div className="relative">
                <img
                  src={venue.image || "/placeholder.svg"}
                  alt={venue.name}
                  className="w-full h-48 object-cover"
                />
                {/* Availability Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      venue.available
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {venue.available ? "Available" : "Booked"}
                  </span>
                </div>
              </div>

              {/* Venue Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {venue.name}
                </h3>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{venue.location}</span>
                </div>

                {/* Capacity and Price */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Capacity</span>
                    <span className="font-medium">{venue.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Starting from</span>
                    <span className="font-medium text-green-600">
                      {venue.priceRange}
                    </span>
                  </div>
                </div>

                {/* Book Now Button */}
                <button
                  onClick={() => handleBooking(venue.id)}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    venue.available
                      ? "bg-pink-500 text-white hover:bg-pink-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!venue.available}
                >
                  {venue.available ? "Book Now" : "Not Available"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredVenues.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No venues found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setShowAvailableOnly(false);
              }}
              className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default VenueBooking;
