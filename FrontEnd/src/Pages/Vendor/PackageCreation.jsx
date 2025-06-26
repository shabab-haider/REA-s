"use client";

import { useContext, useState } from "react";
import { ArrowLeft, Package, Plus, X, Save, DollarSign } from "lucide-react";
import BackButton from "../../Components/BackButton";
import axios from "axios";
import { VendorDataContext } from "../../../context/VendorContext";
import { useNavigate } from "react-router-dom";

const VendorPackageCreation = ({ onSavePackages = () => {} }) => {
  
  const { vendor, setVendor } = useContext(VendorDataContext);
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [currentPackage, setCurrentPackage] = useState({
    title: "",
    description: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPackage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreatePackage = () => {
    if (
      currentPackage.title &&
      currentPackage.description &&
      currentPackage.price
    ) {
      const newPackage = {
        id: Date.now(),
        title: currentPackage.title,
        description: currentPackage.description,
        price: Number.parseFloat(currentPackage.price),
      };

      setPackages((prev) => [...prev, newPackage]);
      setCurrentPackage({ title: "", description: "", price: "" });
    }
  };

  const handleDeletePackage = (id) => {
    setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
  };

  const handleSavePackages = async () => {
  const token = localStorage.getItem("token");

    onSavePackages(packages);
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/vendors/packages`,
      { packages },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status == 200) {
      setVendor(response.data.vendor);
      navigate("/vendor-dashboard");
    }
    alert(`${packages.length} packages saved successfully!`);
  };

  const isFormValid =
    currentPackage.title && currentPackage.description && currentPackage.price;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Package className="w-5 md:w-6 h-6 text-pink-500" />
                <h1 className="text-lg md:text-2xl font-bold text-gray-800">
                  Create Service Packages
                </h1>
              </div>
              <div className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <BackButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Package Creation Form */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Create New Package
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Package Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Package Title *
              </label>
              <input
                type="text"
                name="title"
                value={currentPackage.title}
                onChange={handleInputChange}
                placeholder="e.g., Standard Package"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            </div>

            {/* Package Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Package Price (PKR) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  name="price"
                  value={currentPackage.price}
                  onChange={handleInputChange}
                  placeholder="45000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Package Description */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Package Description *
            </label>
            <textarea
              name="description"
              value={currentPackage.description}
              onChange={handleInputChange}
              rows={3}
              placeholder="Most popular choice for weddings. Complete photography coverage with advanced editing and online gallery access."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              required
            />
          </div>
          {/* Create Package Button */}
          <div className="flex items-end">
            <button
              onClick={handleCreatePackage}
              disabled={!isFormValid}
              className="w-full py-3 px-4 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Package
            </button>
          </div>
        </div>

        {/* Created Packages Display */}
        {packages.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Your Packages ({packages.length})
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.id} className="relative group">
                  {/* Package Card */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeletePackage(pkg.id)}
                      className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete Package"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Package Title */}
                    <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
                      {pkg.title}
                    </h3>

                    {/* Package Price */}
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        PKR {pkg.price.toLocaleString()}
                      </div>
                    </div>

                    {/* Package Description */}
                    <p className="text-gray-600 text-sm leading-relaxed text-center mb-6 min-h-[60px]">
                      {pkg.description}
                    </p>

                    {/* Select Package Button */}
                    <button className="w-full py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors">
                      Select Package
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {packages.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-3">
              No packages created yet
            </h3>
            <p className="text-gray-500 text-lg mb-8">
              Create your first package to start offering different options to
              customers
            </p>
            <div className="max-w-md mx-auto bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                💡 <strong>Tip:</strong> Create multiple packages with different
                price points to give customers more choices
              </p>
            </div>
          </div>
        )}

        {/* Save All Packages Button (Bottom) */}
        {packages.length > 0 && (
          <div className="text-center">
            <button
              onClick={handleSavePackages}
              className="px-12 py-4 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 transition-colors flex items-center mx-auto shadow-lg"
            >
              <Save className="w-6 h-6 mr-3" />
              Save All Packages ({packages.length})
            </button>
            <p className="text-gray-500 text-sm mt-3">
              Once saved, these packages will be available for customers to
              select
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorPackageCreation;
