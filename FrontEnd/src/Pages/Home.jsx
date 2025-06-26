"use client";

import { useState } from "react";
import {
  Search,
  Building,
  Camera,
  Car,
  Scissors,
  Star,
  CheckCircle,
  Users,
  Award,
} from "lucide-react";
import Logo from "../Components/Logo";
import HeroImage from "/Images/HeroImage.png";
import { Link } from "react-router-dom";

const Home = () => {
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Professional styling */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8">
                <Logo />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                REA's Planning
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              <a
                href="#"
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
              >
                Home
              </a>
              <Link
                to="/Services"
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
              >
                Services
              </Link>
              <Link
                to="about-Us"
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
              >
                About Us
              </Link>
              <Link
                href="contact-us"
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* CTA Button */}
            <div className="flex items-center">
              <Link
                to="login"
                className="bg-pink-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced professional design */}
      <section className="bg-gradient-to-br from-gray-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Find Your Perfect
                  <span className="block text-pink-600">Event Services</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Book trusted vendors for your special occasions with ease and
                  confidence
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    to="/services"
                    className="w-full font-semibold bg-purple-100 text-pink-600 py-4 px-6 rounded-xl text-center hover:bg-purple-200 transition-colors"
                  >
                    Book a Service
                  </Link>
                  <Link
                    to="register-vendor"
                    className="w-full font-semibold bg-pink-600 text-white py-4 px-6 rounded-xl text-center hover:bg-pink-700 transition-colors"
                  >
                    Register As Vendor
                  </Link>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src={HeroImage || "/placeholder.svg"}
                  alt="Elegant table setting for an event"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-pink-200 rounded-full opacity-20 -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-purple-200 rounded-full opacity-20 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Professional grid */}
      <section id="Services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Find Services for Your Perfect Event
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our comprehensive range of professional services
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Venues */}
            <Link to="/venue-booking" className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group-hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <div className="bg-pink-100 p-6 rounded-full group-hover:bg-pink-200 transition-colors">
                    <Building className="h-10 w-10 text-pink-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Venues</h3>
                <p className="text-gray-600">
                  Find the perfect venue for your event
                </p>
              </div>
            </Link>

            {/* Photography */}
            <Link to="photography-booking" className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group-hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <div className="bg-pink-100 p-6 rounded-full group-hover:bg-pink-200 transition-colors">
                    <Camera className="h-10 w-10 text-pink-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Photography
                </h3>
                <p className="text-gray-600">Capture your special moments</p>
              </div>
            </Link>

            {/* Transportation */}
            <Link to="Transportation-booking" className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group-hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <div className="bg-pink-100 p-6 rounded-full group-hover:bg-pink-200 transition-colors">
                    <Car className="h-10 w-10 text-pink-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Transportation
                </h3>
                <p className="text-gray-600">Reliable transport services</p>
              </div>
            </Link>

            {/* Salon */}
            <Link to="salon-booking" className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group-hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <div className="bg-pink-100 p-6 rounded-full group-hover:bg-pink-200 transition-colors">
                    <Scissors className="h-10 w-10 text-pink-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Salon</h3>
                <p className="text-gray-600">Book your beauty services</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced design */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by hundreds of satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="mb-6 flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616c9c0e8e3?w=80&h=80&fit=crop&crop=face"
                  alt="Sarah Johnson"
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Sarah Johnson</h3>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 italic">
                "Amazing platform! Found the perfect venue for my wedding!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="mb-6 flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                  alt="Michael Chen"
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Michael Chen</h3>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 italic">
                "Excellent service providers and easy booking process."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="mb-6 flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
                  alt="Emily Davis"
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Emily Davis</h3>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 italic">
                "The best event planning platform I've ever used!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Professional layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How REA's Planning Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to plan your perfect event
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Step 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-pink-600 text-white p-6 rounded-full shadow-lg">
                  <Users className="h-10 w-10" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Create Account
              </h3>
              <p className="text-gray-600">Sign up in just a few clicks</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-pink-600 text-white p-6 rounded-full shadow-lg">
                  <Search className="h-10 w-10" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Search Services
              </h3>
              <p className="text-gray-600">
                Find the perfect service providers
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-pink-600 text-white p-6 rounded-full shadow-lg">
                  <CheckCircle className="h-10 w-10" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Get Confirmation
              </h3>
              <p className="text-gray-600">Secure your booking instantly</p>
            </div>
          </div>

          {/* For Vendors and Users */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Vendors */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-pink-600 text-white p-3 rounded-lg mr-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  For Vendors
                </h3>
              </div>
              <ol className="space-y-4">
                {[
                  "Register your business by filling out the business details form.",
                  "Create packages with pricing, services included, and availability calendar.",
                  "Receive and manage booking requests from users.",
                  "Confirm bookings and provide excellent service.",
                  "Get reviewed and rated by customers to grow your profile!",
                ].map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* For Users */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-pink-600 text-white p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Users</h3>
              </div>
              <ol className="space-y-4">
                {[
                  "Register or login to the platform.",
                  "Search for event services by location, service type, and availability.",
                  "Explore vendors, view packages, and choose the perfect one.",
                  "Send booking requests directly from the vendor's profile.",
                  "Manage your bookings and get updates through your dashboard.",
                ].map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Professional styling */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8">
                  <Logo />
                </div>
                <span className="text-2xl font-bold">REA's Planning</span>
              </div>
              <p className="text-gray-400">
                Making event planning simple and stress-free
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Venues
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Photography
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Transportation
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-3 text-gray-400">
                <li>info@reasplanning.com</li>
                <li>+92 300 1234567</li>
              </ul>
            </div>
          </div>

          <div className="text-center text-gray-500 border-t border-gray-800 pt-8">
            © 2024 REA's Planning. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
