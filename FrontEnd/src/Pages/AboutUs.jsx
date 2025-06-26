"use client";

import {
  Users,
  Award,
  Heart,
  Star,
  Phone,
  Mail,
  MapPin,
  Home,
  ChevronRight,
  Camera,
  Car,
  Scissors,
  Building2,
  Target,
  Eye,
  CheckCircle,
} from "lucide-react";
import Logo from "../Components/Logo";
import { Link } from "react-router-dom";

// Team members data - simple structure
const teamMembers = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e3?w=400&h=400&fit=crop",
    description: "10+ years experience in event planning and management",
  },
  {
    id: 2,
    name: "Muhammad Ali",
    role: "Operations Manager",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    description: "Expert in vendor management and customer relations",
  },
  {
    id: 3,
    name: "Fatima Khan",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    description: "Specializes in event design and creative solutions",
  },
  {
    id: 4,
    name: "Ahmed Hassan",
    role: "Customer Success",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    description: "Dedicated to ensuring perfect customer experiences",
  },
];

// Company stats - simple numbers
const stats = [
  { number: "500+", label: "Happy Clients", icon: Users },
  { number: "1000+", label: "Events Completed", icon: Award },
  { number: "50+", label: "Trusted Partners", icon: Heart },
  { number: "5", label: "Years Experience", icon: Star },
];

// Services overview
const services = [
  {
    name: "Wedding Venues",
    icon: Building2,
    description: "Beautiful halls and banquets",
  },
  {
    name: "Photography",
    icon: Camera,
    description: "Professional photographers",
  },
  { name: "Transportation", icon: Car, description: "Luxury car rentals" },
  {
    name: "Beauty Services",
    icon: Scissors,
    description: "Premium salon services",
  },
];

// Company values
const values = [
  {
    title: "Quality First",
    description: "We never compromise on the quality of our services",
    icon: CheckCircle,
  },
  {
    title: "Customer Focus",
    description: "Your satisfaction is our top priority",
    icon: Heart,
  },
  {
    title: "Professional Team",
    description: "Experienced professionals dedicated to excellence",
    icon: Users,
  },
  {
    title: "Trusted Partners",
    description: "We work with the best vendors in the industry",
    icon: Award,
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Same as main booking page */}
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
              <span className="text-gray-900 font-medium">About Us</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About
            <span className="block text-pink-600">REA's Planning</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are passionate about creating unforgettable moments and making
            your special events truly extraordinary. Based in Sialkot, we've
            been serving our community with dedication and excellence.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-pink-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2019, REA's Planning started with a simple mission:
                to make every event special and memorable. What began as a small
                team with big dreams has grown into Sialkot's trusted event
                planning partner.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We understand that every event is unique and personal. Whether
                it's your wedding day, a corporate gathering, or a family
                celebration, we bring the same level of dedication and attention
                to detail to every project.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to work with the finest venues,
                photographers, transportation services, and beauty professionals
                in Sialkot, ensuring our clients receive nothing but the best.
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop"
                alt="Our team at work"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 text-lg">
                To provide exceptional event planning services that exceed
                expectations and create lasting memories for our clients through
                professional expertise and personalized attention.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 text-lg">
                To be the leading event planning company in Pakistan, known for
                our innovation, reliability, and commitment to making every
                celebration perfect and unforgettable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-6">
                  <value.icon className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive event services under one roof
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6 group-hover:bg-pink-100 transition-colors">
                  <service.icon className="w-8 h-8 text-gray-600 group-hover:text-pink-600 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.name}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              The passionate people behind REA's Planning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="relative mb-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-pink-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Plan Your Event?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Let's discuss how we can make your special day perfect. Contact us
            today!
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="bg-pink-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-pink-700 transition-colors"
            >
              View Our Services
            </Link>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-medium hover:border-gray-400 transition-colors">
              Get In Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
