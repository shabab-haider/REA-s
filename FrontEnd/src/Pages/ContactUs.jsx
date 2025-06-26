"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Home,
  ChevronRight,
  MessageCircle,
  Calendar,
  User,
  Building2,
  Camera,
  Car,
  Scissors,
} from "lucide-react";
import Logo from "../Components/Logo";
import { Link } from "react-router-dom";

// Contact information - simple data
const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+92 123 456 7890", "+92 321 987 6543"],
    description: "Call us anytime during business hours",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@reasplanning.com", "support@reasplanning.com"],
    description: "We'll respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["123 Main Street", "Sialkot, Punjab, Pakistan"],
    description: "Visit our office for consultation",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 9:00 AM - 8:00 PM", "Sat - Sun: 10:00 AM - 6:00 PM"],
    description: "We're here when you need us",
  },
];


const ContactUs = () => {
  // Simple form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    eventDate: "",
    message: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple form submission (you can add your logic here)
    alert("Thank you for your message! We'll get back to you soon.");
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      eventDate: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Same as other pages */}
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

            {/* Navigation */}
            <nav className="flex items-center space-x-2 text-gray-600">
              <Link
                to="/"
                className="flex items-center hover:text-gray-900 transition-colors"
              >
                <Home className="w-4 h-4 mr-1" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">Contact Us</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Get In
            <span className="block text-pink-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to plan your perfect event? We're here to help make your
            dreams come true. Contact us today for a free consultation.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Contact Information
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We'd love to hear from you. Choose the most convenient way to
                reach us.
              </p>

              {/* Contact Cards */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                        <info.icon className="w-6 h-6 text-pink-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-700 font-medium">
                          {detail}
                        </p>
                      ))}
                      <p className="text-gray-600 text-sm mt-2">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive Map</p>
                  <p className="text-sm">123 Main Street, Sialkot</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send Us a Message
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your event and how we can help..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Need Immediate Assistance?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            For urgent inquiries, reach out to us directly
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+921234567890"
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
            <a
              href="mailto:info@reasplanning.com"
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-medium hover:border-gray-400 transition-colors flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
