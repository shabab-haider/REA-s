import { useContext, useEffect, useState } from "react";
import { Home, User, LogOut, Clock, MapPin, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { CustomerDataContext } from "../../../context/CustomerContext";
import axios from "axios";
import Logo from "../../Components/Logo";

const Dashboard = () => {
  const { customer, setCustomer } = useContext(CustomerDataContext);
  const [fullName, setFullName] = useState(customer.fullname);
  const [profileImage, setProfileImage] = useState(customer.profileImage);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100">
        <div className="flex items-center sm:hidden">
          <div className="text-pink-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 4h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
            </svg>
          </div>
          <h1 className="ml-2 text-lg font-semibold">REA's Planning</h1>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar - Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 md:hidden ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out z-30 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 md:justify-start">
          <h2 className="text-xl font-semibold text-gray-800">EventBook</h2>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="mt-6">
          <div className="px-3">
            <Link
              to="/customer-dashboard"
              className="flex items-center px-4 py-3 text-white bg-pink-500 rounded-md"
              onClick={() => setSidebarOpen(false)}
            >
              <Home className="w-5 h-5 mr-3" />
              <span>Home</span>
            </Link>
            <Link
              to="/customer-profile"
              className="flex items-center px-4 py-3 mt-2 text-gray-600 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <User className="w-5 h-5 mr-3" />
              <span>Profile</span>
            </Link>
            <Link
              to="/logout"
              className="flex items-center px-4 py-3 mt-2 text-gray-600 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
          <div className="flex items-center">
            <div className="w-6">
              <Logo />
            </div>
            <h1 className="ml-1 text-xl font-semibold">REA's Planning</h1>
          </div>
          <Link
            to="/book-service"
            className="px-4 py-2 font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600"
          >
            Book Service
          </Link>
        </header>

        {/* Mobile Action Button */}
        <div className="fixed bottom-6 right-6 md:hidden z-10">
          <Link to="/services">
            <button className="p-4 text-white bg-pink-500 rounded-full shadow-lg hover:bg-pink-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </Link>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Dashboard
          </h2>
          <p className="mt-2 text-gray-600">
            Welcome back, <b>{fullName}</b>
          </p>

          {/* User Profile Image */}
          <div className="mt-4 flex justify-center md:justify-start">
            <img
              src={profileImage}
              alt={fullName}
              className="object-cover w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gray-200"
            />
          </div>

          {/* Upcoming Bookings */}
          <div className="mt-6 md:mt-8">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              Upcoming Bookings
            </h3>

            <div className="mt-3 md:mt-4 space-y-3 md:space-y-4">
              {/* Booking Card 1 */}
              <div className="p-3 md:p-4 bg-white border border-gray-200 rounded-lg">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-base md:text-lg font-medium text-gray-800">
                    Wedding Photography
                  </h4>
                  <span className="px-3 py-1 text-xs md:text-sm font-medium text-green-600 bg-green-100 rounded-full">
                    Confirmed
                  </span>
                </div>
                <div className="mt-2 md:mt-3 space-y-2">
                  <div className="flex items-center text-sm md:text-base text-gray-600">
                    <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Dec 15, 2024 at 2:00 PM</span>
                  </div>
                  <div className="flex items-center text-sm md:text-base text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Crystal Images</span>
                  </div>
                </div>
              </div>

              {/* Booking Card 2 */}
              <div className="p-3 md:p-4 bg-white border border-gray-200 rounded-lg">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-base md:text-lg font-medium text-gray-800">
                    Catering Service
                  </h4>
                  <span className="px-3 py-1 text-xs md:text-sm font-medium text-yellow-600 bg-yellow-100 rounded-full">
                    Pending
                  </span>
                </div>
                <div className="mt-2 md:mt-3 space-y-2">
                  <div className="flex items-center text-sm md:text-base text-gray-600">
                    <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Dec 20, 2024 at 11:00 AM</span>
                  </div>
                  <div className="flex items-center text-sm md:text-base text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Gourmet Delights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Past Bookings */}
          <div className="mt-6 md:mt-8">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              Past Bookings
            </h3>

            <div className="mt-3 md:mt-4">
              {/* Past Booking Card */}
              <div className="p-3 md:p-4 bg-white border border-gray-200 rounded-lg">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-base md:text-lg font-medium text-gray-800">
                    Birthday Party DJ
                  </h4>
                  <span className="px-3 py-1 text-xs md:text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
                    Completed
                  </span>
                </div>
                <div className="mt-2 md:mt-3 space-y-2">
                  <div className="flex items-center text-sm md:text-base text-gray-600">
                    <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Nov 30, 2024 at 7:00 PM</span>
                  </div>
                  <div className="flex items-center text-sm md:text-base text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Rhythm Masters</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
