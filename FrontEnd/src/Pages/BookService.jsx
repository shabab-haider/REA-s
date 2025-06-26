import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Star,
  ArrowRight,
  Building2,
  Camera,
  Car,
  Scissors,
} from "lucide-react";

const BookService = () => {
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
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

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-800">
                      {service.rating}
                    </span>
                  </div>
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
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{service.providers} Providers</span>
                      </div>
                      <div className="text-green-600 font-semibold">
                        From PKR {service.price}
                      </div>
                    </div>
                  </div>

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

          {/* No Results */}
        </div>
      </section>
    </div>
  );
};

export default BookService;
