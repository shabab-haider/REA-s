import { toast } from "react-toastify";
import { useContext, useState } from "react";
import {
  ArrowLeft,
  Upload,
  MapPin,
  DollarSign,
  Star,
  Camera,
  Save,
  Eye,
  X,
  Award,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import Logo from "./Logo";
import { VendorDataContext } from "../../context/VendorContext";
import axios from "axios";

const PhotographyServiceCreation = () => {
  const token = localStorage.getItem("token");
  const { vendor, setVendor } = useContext(VendorDataContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    speciality: "",
    location: "",
    experience: "",
    priceRangeMin: "",
    priceRangeMax: "",
    description: "",
    services: [],
    serviceType: "photography", // This would come from vendor registration
  });

  const [profileImage, setprofileImage] = useState();
  const [portfolioImage, setportfolioImage] = useState();
  const [newService, setNewService] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [photographerImage, setphotographerImage] = useState(false);
  const [portImage, setportImage] = useState(false);

  // Common photography services
  const commonServices = [
    "Wedding",
    "Engagement",
    "Portrait",
    "Event",
    "Corporate",
    "Fashion",
    "Product",
    "Family",
    "Maternity",
    "Birthday",
    "Anniversary",
    "Pre-Wedding",
  ];

  // Photography specialities
  const specialities = [
    "Wedding Photography",
    "Portrait & Fashion",
    "Event Photography",
    "Corporate Photography",
    "Product Photography",
    "Family & Kids",
    "Fashion Photography",
    "Maternity Photography",
    "Newborn Photography",
    "Commercial Photography",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (type, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Care_Connect");
    formData.append("cloud_name", "di9ljccil");
    console.log("Uploading image...");
    toast.promise(
      fetch("https://api.cloudinary.com/v1_1/di9ljccil/image/upload", {
        method: "POST",
        body: formData,
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error("Upload Upload failed");
        }
        const uploadedImage = await res.json();
        if (type == "profile") {
          setprofileImage(uploadedImage.url);
          setphotographerImage(!photographerImage);
        }
        if (type == "portfolio") {
          setportfolioImage(uploadedImage.url);
          setportImage(!portImage);
        }
        console.log("Upload complete ✅");
      }),
      {
        pending: "Uploading...",
        success: "uploaded successfully!",
        error: "Failed to upload",
      }
    );
  };

  const removeImage = (type) => {
    if (type == "profile") {
      setprofileImage("");
      setphotographerImage(!photographerImage);
    }
    if (type == "portfolio") {
      setportfolioImage("");
      setportImage(!portImage);
    }
  };

  const addService = (service) => {
    if (service && !formData.services.includes(service)) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, service],
      }));
    }
    setNewService("");
  };

  const removeService = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      photographerName: formData.name,
      photographySpeciality: formData.speciality,
      location: formData.location,
      experience: formData.experience,
      priceRange: {
        min: formData.priceRangeMin,
        max: formData.priceRangeMax,
      },
      Description: formData.description,
      profileImage,
      portfolioImage,
      services: formData.services,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/vendors/photography`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status == 201) {
      setVendor(response.data.vendor);
      setIsLoading(false);
      navigate("/package-creation");
    }
  };

  const generatePreviewData = () => {
    return {
      id: 1,
      name: formData.name || "Your Photography Service",
      speciality: formData.speciality || "Photography Service",
      location: formData.location || "Your Location",
      image: profileImage,
      portfolioImage: portfolioImage,
      rating: 4.9, // Default rating for new photographers
      reviews: 0, // New service starts with 0 reviews
      experience: formData.experience || "New Service",
      priceRange:
        formData.priceRangeMin && formData.priceRangeMax
          ? `PKR ${formData.priceRangeMin} - ${formData.priceRangeMax}`
          : "Price not set",
      available: true,
      services:
        formData.services.length > 0
          ? formData.services
          : ["Service not specified"],
      description: formData.description || "No description provided",
    };
  };

  const previewData = generatePreviewData();

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

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Create Your Photography Service
          </h1>
          <p className="text-lg text-gray-600">
            Add your photography service details to start receiving bookings
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Eye className="w-5 h-5 mr-2" />
            {showPreview ? "Hide Preview" : "Preview Listing"}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Photography Service Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photographer Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Photographer Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Ahmed Hassan"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Speciality */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Photography Speciality *
                </label>
                <select
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Speciality</option>
                  {specialities.map((speciality) => (
                    <option key={speciality} value={speciality}>
                      {speciality}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Cantt Area, Sialkot"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <div className="relative">
                  <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g., 8+ Years"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Range (PKR) *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      name="priceRangeMin"
                      value={formData.priceRangeMin}
                      onChange={handleInputChange}
                      placeholder="Min Price"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      name="priceRangeMax"
                      value={formData.priceRangeMax}
                      onChange={handleInputChange}
                      placeholder="Max Price"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your photography style, experience, and what makes you special..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Profile Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Photographer Profile Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload("profile", e)}
                    className="hidden"
                    id="profile-upload"
                  />
                  <label htmlFor="profile-upload" className="cursor-pointer">
                    {photographerImage ? (
                      <div className="relative">
                        <img
                          src={profileImage || "/placeholder.svg"}
                          alt="Profile"
                          className="w-32 h-32 object-cover rounded-lg mx-auto mb-2"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage("profile")}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          Click to upload profile image
                        </p>
                        <p className="text-sm text-gray-500">
                          PNG, JPG up to 10MB
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Portfolio Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Portfolio Sample Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload("portfolio", e)}
                    className="hidden"
                    id="portfolio-upload"
                  />
                  <label htmlFor="portfolio-upload" className="cursor-pointer">
                    {portImage ? (
                      <div className="relative">
                        <img
                          src={portfolioImage || "/placeholder.svg"}
                          alt="Portfolio"
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage("portfolio")}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          Click to upload portfolio sample
                        </p>
                        <p className="text-sm text-gray-500">
                          PNG, JPG up to 10MB
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Photography Services */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Photography Services Offered
                </label>

                {/* Quick Add Services */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Quick add common services:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {commonServices
                      .filter((service) => !formData.services.includes(service))
                      .slice(0, 6)
                      .map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => addService(service)}
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-pink-100 hover:text-pink-700 transition-colors"
                        >
                          + {service}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Custom Service Input */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    placeholder="Add custom service"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addService(newService))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => addService(newService)}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    Add
                  </button>
                </div>

                {/* Selected Services */}
                {formData.services.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm flex items-center"
                      >
                        {service}
                        <button
                          type="button"
                          onClick={() => removeService(service)}
                          className="ml-2 text-pink-500 hover:text-pink-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Service...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Create Photography Service
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Live Preview
              </h2>

              {/* Preview Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Portfolio Image */}
                <div className="relative">
                  <img
                    src={previewData.portfolioImage || "/placeholder.svg"}
                    alt={`${previewData.name} portfolio`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
                      Available
                    </span>
                  </div>
                </div>

                {/* Photographer Details */}
                <div className="p-6">
                  {/* Photographer Info */}
                  <div className="flex items-center mb-3">
                    <img
                      src={previewData.image || "/placeholder.svg"}
                      alt={previewData.name}
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {previewData.name}
                      </h3>
                      <p className="text-sm text-pink-600 font-medium">
                        {previewData.speciality}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{previewData.location}</span>
                  </div>

                  {/* Services Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {previewData.services.slice(0, 3).map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                    {previewData.services.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{previewData.services.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Experience and Price */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Award className="w-4 h-4 mr-1" />
                        <span>Experience</span>
                      </div>
                      <span className="font-medium">
                        {previewData.experience}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>Starting from</span>
                      </div>
                      <span className="font-medium text-green-600">
                        {previewData.priceRange}
                      </span>
                    </div>
                  </div>

                  {/* Book Button */}
                  <button className="w-full py-3 rounded-lg font-medium bg-pink-500 text-white">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotographyServiceCreation;
