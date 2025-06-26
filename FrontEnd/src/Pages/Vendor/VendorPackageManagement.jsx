"use client";

import { useContext, useEffect, useState } from "react";
import {
  ArrowLeft,
  Package,
  Plus,
  Save,
  DollarSign,
  Trash2,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { VendorDataContext } from "../../../context/VendorContext";
import axios from "axios";

const VendorPackageManagement = () => {
  const [packages, setPackages] = useState([]);
  const { vendor, setVendor } = useContext(VendorDataContext);
  const vendorId = vendor._id;
  const getPackages = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/vendors/packages`,
      { vendorId }
    );
    setPackages(response.data.packages);
  };
  useEffect(() => {
    getPackages();
  }, []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPackage, setNewPackage] = useState({
    title: "",
    description: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPackage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPackage = async () => {
    if (newPackage.title && newPackage.description && newPackage.price) {
      const packageToAdd = {
        vendorId,
        title: newPackage.title,
        description: newPackage.description,
        price: Number.parseFloat(newPackage.price),
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/vendors/packages/add`,
          packageToAdd
        );

        setPackages(response.data.packages);
        setNewPackage({ title: "", description: "", price: "" });
        setShowAddForm(false);
      } catch (err) {
        console.error("Failed to add package:", err);
      }
    }
  };


const handleDeletePackage = async (packageId) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/vendors/packages/delete`,
      {
        vendorId,
        packageId,
      }
    );

    setPackages((prev) => prev.filter((pkg) => pkg._id !== packageId));
  } catch (err) {
    console.error("Error deleting package:", err);
  }
}

  const cancelAddForm = () => {
    setNewPackage({ title: "", description: "", price: "" });
    setShowAddForm(false);
  };

  const isFormValid = newPackage.title && newPackage.description && newPackage.price;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <Package className="w-6 h-6 text-pink-500" />
                <h1 className="text-2xl font-bold text-gray-800">
                  Package Management
                </h1>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center px-6 py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Package
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Add Package Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Add New Package
            </h2>

            <div className="space-y-6">
              {/* Package Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Package Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={newPackage.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Deluxe Wedding Package"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Package Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Package Description *
                </label>
                <textarea
                  name="description"
                  value={newPackage.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe what's included in this package..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
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
                    value={newPackage.price}
                    onChange={handleInputChange}
                    placeholder="25000"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={cancelAddForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPackage}
                  disabled={!isFormValid}
                  className="flex-1 py-3 px-6 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Add Package
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Packages List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Your Packages
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Manage all your service packages
                </p>
              </div>
              <div className="text-sm text-gray-500">
                Total: {packages.length} package
                {packages.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>

          {packages.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No packages created yet
              </h3>
              <p className="text-gray-500 mb-6">
                Create your first package to start offering services to
                customers
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors"
              >
                Create First Package
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {packages.map((pkg) => (
                <div
                  key={pkg._id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {pkg.title}
                        </h3>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          PKR {pkg.Pricing}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed mb-3 max-w-3xl">
                        {pkg.Description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 ml-6">
                      <button
                        onClick={() => handleDeletePackage(pkg._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Package"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Package Summary */}
      </div>
    </div>
  );
};

export default VendorPackageManagement;
