import { toast } from "react-toastify";
import { useContext, useState } from "react";
import {
  ArrowLeft,
  Upload,
  MapPin,
  Users,
  DollarSign,
  Star,
  Building2,
  Save,
  Eye,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import Logo from "./Logo";
import axios from "axios";
import { VendorDataContext } from "../../context/VendorContext";

const VenueServiceCreation = () => {
  const token = localStorage.getItem("token");
  const { vendor, setVendor } = useContext(VendorDataContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    priceRangeMin: "",
    priceRangeMax: "",
    description: "",
    amenities: [],
  });

  const [image, setImage] = useState();
  const [newAmenity, setNewAmenity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [venueImage, setvenueImage] = useState(false);

  // Common amenities for venues
  const commonAmenities = [
    "Air Conditioning",
    "Parking",
    "Catering Kitchen",
    "Sound System",
    "Stage",
    "Bridal Room",
    "Garden Area",
    "Valet Parking",
    "Photography Area",
    "Lighting System",
    "Security",
    "Backup Power",
    "WiFi",
    "Restrooms",
    "Dance Floor",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
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
        setImage(uploadedImage.url);
        setvenueImage(!venueImage);
        console.log("Upload complete ✅");
      }),
      {
        pending: "Uploading...",
        success: "uploaded successfully!",
        error: "Failed to upload",
      }
    );
  };

  const removeImage = () => {
    setImage("");
    setvenueImage(!venueImage);
  };

  const addAmenity = (amenity) => {
    if (amenity && !formData.amenities.includes(amenity)) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenity],
      }));
    }
    setNewAmenity("");
  };

  const removeAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const Data = {
      venueName: formData.name,
      location: formData.location,
      guestCapacity: formData.capacity,
      priceRange: {
        min: formData.priceRangeMin,
        max: formData.priceRangeMax,
      },
      Description: formData.description,
      Image: image,
      features: formData.amenities,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/vendors/venue`,
      Data,
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
      name: formData.name || "Your Venue Name",
      location: formData.location || "Your Location",
      image: image,
      rating: 4.8, // Default rating for new venues
      reviews: 0, // New venue starts with 0 reviews
      capacity: formData.capacity || "Not specified",
      priceRange:
        formData.priceRangeMin && formData.priceRangeMax
          ? `PKR ${formData.priceRangeMin} - ${formData.priceRangeMax}`
          : "Price not set",
      available: true,
      description: formData.description || "No description provided",
      amenities: formData.amenities,
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

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Create Your Venue Service
          </h1>
          <p className="text-lg text-gray-600">
            Add your venue details to start receiving bookings
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
              Venue Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Venue Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Venue Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Royal Palace Marriage Hall"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location *
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

              {/* Capacity */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Guest Capacity *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="e.g., 300-500 Guests"
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
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your venue, its features, and what makes it special..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Images Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Venue Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Click to upload venue image
                    </p>
                  </label>
                </div>

                {/* Image Preview */}

                <div
                  className={`${
                    venueImage ? "grid grid-cols-3 gap-4 mt-4" : "hidden"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Venue"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage()}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amenities & Features
                </label>

                {/* Quick Add Amenities */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Quick add common amenities:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {commonAmenities
                      .filter(
                        (amenity) => !formData.amenities.includes(amenity)
                      )
                      .slice(0, 6)
                      .map((amenity) => (
                        <button
                          key={amenity}
                          type="button"
                          onClick={() => addAmenity(amenity)}
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-pink-100 hover:text-pink-700 transition-colors"
                        >
                          + {amenity}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Custom Amenity Input */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    placeholder="Add custom amenity"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addAmenity(newAmenity))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => addAmenity(newAmenity)}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    Add
                  </button>
                </div>

                {/* Selected Amenities */}
                {formData.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm flex items-center"
                      >
                        {amenity}
                        <button
                          type="button"
                          onClick={() => removeAmenity(amenity)}
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
                    Create Venue Service
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
                {/* Venue Image */}
                <div className="relative">
                  <img
                    src={previewData.image || "/placeholder.svg"}
                    alt={previewData.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
                      Available
                    </span>
                  </div>
                </div>

                {/* Venue Details */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {previewData.name}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{previewData.location}</span>
                  </div>

                  {/* Rating */}
                  {/* <div className="flex items-center mb-3">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({previewData.reviews} reviews)
                    </span>
                  </div> */}

                  {/* Capacity and Price */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Capacity</span>
                      <span className="font-medium">
                        {previewData.capacity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Starting from</span>
                      <span className="font-medium text-green-600">
                        {previewData.priceRange}
                      </span>
                    </div>
                  </div>

                  {/* Amenities Preview */}
                  {previewData.amenities.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {previewData.amenities.slice(0, 3).map((amenity) => (
                          <span
                            key={amenity}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                        {previewData.amenities.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            +{previewData.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

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

export default VenueServiceCreation;
