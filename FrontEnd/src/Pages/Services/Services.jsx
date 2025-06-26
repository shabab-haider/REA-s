"use client";

import { useState } from "react";
import {
  Search,
  Star,
  Camera,
  Car,
  Scissors,
  Building2,
  Users,
  ArrowRight,
  Home,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Logo from "../../Components/Logo";
import { Link } from "react-router-dom";
import BackButton from "../../Components/BackButton";

// Service categories - simple data structure
const services = [
  {
    id: 1,
    title: "Venues",
    subtitle: "Elegant Halls & Banquets",
    description: "Discover beautiful venues for your perfect wedding day",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop",
    icon: Building2,
    providers: "25+",
    price: "200,000",
    rating: "4.8",
    link: "/venue-booking",
    gradient: "from-blue-600 to-blue-800",
  },
  {
    id: 2,
    title: "Photography",
    subtitle: "Professional Photographers",
    description: "Capture your precious moments with expert photographers",
    image:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop",
    icon: Camera,
    providers: "15+",
    price: "15,000",
    rating: "4.9",
    link: "/photography-booking",
    gradient: "from-purple-600 to-purple-800",
  },
  {
    id: 3,
    title: "Transportation",
    subtitle: "Luxury Car Rentals",
    description: "Comfortable and reliable transport for your special day",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop",
    icon: Car,
    providers: "20+",
    price: "5,000",
    rating: "4.7",
    link: "/transportation-booking",
    gradient: "from-green-600 to-green-800",
  },
  {
    id: 4,
    title: "Beauty & Salon",
    subtitle: "Premium Beauty Services",
    description: "Transform your look with professional beauty treatments",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop",
    icon: Scissors,
    providers: "18+",
    price: "2,000",
    rating: "4.8",
    link: "/salon-booking",
    gradient: "from-pink-600 to-pink-800",
  },
];

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Simple search filter
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Clean and simple */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8">
                <Logo />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                REA's Planning
              </span>
            </div>

            <BackButton />
          </div>
        </div>
      </header>

      {/* Hero Section - Professional and clean */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Dream Event
            <span className="block text-pink-600">Starts Here</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Professional event services. From venues to photography,
            we help make your special moments unforgettable.
          </p>

          {/* Search Bar - Simple and elegant */}
          {/* <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 text-lg rounded-full border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
            />
          </div> */}
        </div>
      </section>

      {/* Services Section - Clean grid layout */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600">
              Choose from our premium service categories
            </p>
          </div>

          {/* Services Grid - Simple 2x2 layout */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-60`}
                  ></div>

                  {/* Icon */}
                  <div className="absolute top-6 left-6">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Rating */}
                    {/* <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-800">
                        {service.rating}
                      </span>
                    </div> */}
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-pink-600 font-medium mb-3">
                    {service.subtitle}
                  </p>
                  <p className="text-gray-600 mb-6">{service.description}</p>

                  {/* Stats */}
                  {/* <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{service.providers} Providers</span>
                      </div>
                      <div className="text-green-600 font-semibold">
                        From PKR {service.price}
                      </div>
                    </div>
                  </div> */}

                  {/* Button */}
                  <Link
                    to={service.link}
                    className="w-full bg-gray-900 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 group"
                  >
                    <span>Explore {service.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* No Results - Simple message */}
          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-4">No services found</p>
              <button
                onClick={() => setSearchTerm("")}
                className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                Show All Services
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section - Professional */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Need Personal Assistance?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Our expert team is ready to help you plan your perfect event
          </p>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="w-5 h-5" />
              <span>+92 123 456 7890</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail className="w-5 h-5" />
              <span>info@reasplanning.com</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>Sialkot, Pakistan</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to="/contact-us"
            className="bg-pink-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-pink-700 transition-colors"
          >
            Contact Our Team
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
