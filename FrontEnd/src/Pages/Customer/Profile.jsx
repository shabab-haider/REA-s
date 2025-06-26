import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { Camera, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import defaultImage from "/Images/defaultProfile.png";
import axios from "axios";
import { CustomerDataContext } from "../../../context/CustomerContext";

const Profile = () => {
  const [show, setShow] = useState(false);
  const { customer, setCustomer } = useContext(CustomerDataContext);

  const [fullName, setFullName] = useState(customer.fullname);
  const [email, setEmail] = useState(customer.email);
  const [OldPassword, setOldPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState(customer.contactNo);

  const [profileImage, setProfileImage] = useState(customer.profileImage);
  const [prevProfile, setPrevProfile] = useState();
  const [upload, setUpload] = useState(false);
  const [editing, setEditing] = useState(false);

  const handlePhotoChange = (e) => {
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
        setPrevProfile(profileImage);
        setProfileImage(uploadedImage.url);
        setUpload(!upload);
        console.log("Upload complete ✅");
      }),
      {
        pending: "Uploading Profile Picture...",
        success: "Profile updated successfully!",
        error: "Failed to update profile.",
      }
    );
  };

  const handleRemovePhoto = () => {
    setProfileImage(defaultImage);
  };

  const handleCancelUpload = () => {
    setProfileImage(prevProfile);
    setUpload(!upload);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updates = {
      _id: customer._id,
      fullname: fullName,
      email,
      contactNo: phoneNumber,
      profileImage,
    };
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/customers/update`, updates)
      .then((response) => {
        if (response.status == 200) {
          setCustomer(response.data.customer);
          setUpload(false);
          setEditing(false);
        }
      });
    toast.success("Profile Updated Successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white py-4 px-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-pink-500 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 4h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold">REA's Planning</h1>
          </div>
          <Link
            to="/customer-dashboard"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-600 mt-1">
              Manage your personal information
            </p>

            <hr className="my-6 border-gray-200" />

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Image Section */}
                <div className="flex flex-col items-center">
                  <div className="w-36 h-36 rounded-full overflow-hidden mb-4">
                    <img
                      src={profileImage || defaultImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {upload ? (
                    <div className="w-full flex flex-col justify-center items-center">
                      <button
                        type="button"
                        onClick={handleCancelUpload}
                        className="text-black hover:text-gray-700 flex items-center bg-gray-300 px-4 py-2 rounded-md cursor-pointer"
                      >
                        <span>Cancel Upload</span>
                      </button>
                    </div>
                  ) : (
                    <div className="w-full flex flex-col justify-center items-center">
                      <label className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md cursor-pointer transition flex items-center justify-center mb-2">
                        <Camera className="h-4 w-4 mr-2" />
                        <span>Change Photo</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handlePhotoChange}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="text-gray-500 hover:text-gray-700 flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span>Remove</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Form Fields */}
                <div className="flex-1 space-y-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-gray-700 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      disabled={!editing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      disabled={!editing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-gray-700 mb-2"
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      value={phoneNumber}
                      disabled={!editing}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {!editing ? (
                <div className="flex justify-end mt-8 space-x-4">
                  <button
                    type="button"
                    className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                    onClick={() => {
                      setEditing(!editing);
                    }}
                  >
                    Edit Profile
                  </button>
                </div>
              ) : (
                <div className="w-full flex flex-col gap-2 mt-7 md:flex-row justify-end">
                  <a
                    href="/customer-profile"
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-center"
                  >
                    Cancel Changes
                  </a>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                  >
                    Update Profile
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
