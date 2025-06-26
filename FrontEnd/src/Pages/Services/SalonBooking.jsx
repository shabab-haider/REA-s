"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Calendar,
  MapPin,
  Star,
  Scissors,
  Clock,
  DollarSign,
  Facebook,
  Twitter,
  Instagram,
  Home,
  ChevronRight,
  Filter,
  Sparkles,
} from "lucide-react";
import Logo from "../../Components/Logo";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../../Components/BackButton";
import axios from "axios";

const serviceTypes = [
  "All Services",
  "Bridal",
  "Hair Cut",
  "Makeup",
  "Facial",
  "Nails",
  "Spa",
  "Hair Color",
];

const SalonBooking = () => {
  const [salons, setSalons] = useState([]);
  const [vendors, setVendors] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const getSalons = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/vendors/salons`
      );
      console.log(response.data.salons);
      setSalons(response.data.salons);
    };
    getSalons();
  }, []);
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState  ("");

  useEffect(() => {
      if (!selectedDate) return; // wait for selectedDate
  
      const fetchAvailableVendors = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/vendors/available-vendors`,
            { date: selectedDate, serviceType: "Salon" }
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
      if (!salons.length || !vendors.length) return;
  
      const updatedSalons = salons.map((salon) => {
        const match = vendors.find((v) => v.id === salon.id);
        return {
          ...salon,
          available: match?.available ?? true, // if not found, assume available
        };
      });
  
      setSalons(updatedSalons);
    }, [vendors, salons]);

  const [selectedService, setSelectedService] = useState("All Services");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  // Filter salons based on search, service type, and availability
  const filteredSalons = salons.filter((salon) => {
    const matchesSearch =
      salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salon.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salon.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesService =
      selectedService === "All Services" ||
      salon.services.some((service) =>
        service.toLowerCase().includes(selectedService.toLowerCase())
      );

    const matchesAvailability = !showAvailableOnly || salon.available;

    return matchesSearch && matchesService && matchesAvailability;
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

            {/* Navigation */}
            <BackButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Premium Beauty Salons
          </h1>
          <p className="text-gray-600">
            Transform Your Look with Professional Beauty Services
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search salons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Service Type Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none bg-white"
              >
                {serviceTypes.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
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
              className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                showAvailableOnly
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Available Only
            </button>
          </div>
        </div>

        {/* Salons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSalons.map((salon) => (
            <div
              key={salon.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Salon Image */}
              <div className="relative">
                <img
                  src={salon.salonImage || "/placeholder.svg"}
                  alt={`${salon.name} interior`}
                  className="w-full h-48 object-cover"
                />
                {/* Availability Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      salon.available
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {salon.available ? "Available" : "Booked"}
                  </span>
                </div>
              </div>

              {/* Salon Details */}
              <div className="p-4">
                {/* Salon Info */}
                <div className="flex items-center mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {salon.name}
                    </h3>
                    <p className="text-sm text-pink-600 font-medium">
                      {salon.speciality}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{salon.location}</span>
                </div>

                {/* Opening Hours */}
                <div className="flex items-center text-gray-600 mb-3">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{salon.openTime}</span>
                </div>

                {/* Services Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {salon.services.slice(0, 4).map((service) => (
                    <span
                      key={service}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                {/* Experience and Price */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Sparkles className="w-4 h-4 mr-1" />
                      <span>Experience</span>
                    </div>
                    <span className="font-medium">{salon.experience}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span>Starting from</span>
                    </div>
                    <span className="font-medium text-green-600">
                      {salon.priceRange}
                    </span>
                  </div>
                </div>

                {/* Book Now Button */}
                <button
                  onClick={() => handleBooking(salon.id)}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    salon.available
                      ? "bg-pink-500 text-white hover:bg-pink-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!salon.available}
                >
                  {salon.available ? "Book Appointment" : "Not Available"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSalons.length === 0 && (
          <div className="text-center py-12">
            <Scissors className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">
              No salons found matching your criteria.
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedService("All Services");
                setShowAvailableOnly(false);
              }}
              className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SalonBooking;
