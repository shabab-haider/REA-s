"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Calendar,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  User,
  Package,
  CheckCircle,
  XCircle,
  Menu,
  X,
  Home,
  Settings,
  BarChart3,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const VendorDashboard = () => {
  const token = localStorage.getItem("token");
  const [blockedDates, setBlockedDates] = useState([]);

  useEffect(() => {
    const getblockedDates = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/vendors/bookedDates`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBlockedDates(response.data.bookedDates);
    };
    getblockedDates();
  }, []);

  const [notifications, setNotifications] = useState([]);
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/vendors/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(res.data.notifications);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  // console.log(notifications);

  // Calendar functionality
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  };

  const isDateBlocked = (year, month, day) => {
    const dateString = formatDate(year, month, day);
    return blockedDates.includes(dateString);
  };

  const toggleDateBlock = async (year, month, day) => {
    const dateString = formatDate(year, month, day);
    const url = blockedDates.includes(dateString)
      ? "/vendors/bookedDates/remove"
      : "/vendors/bookedDates/add";

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}${url}`,
        { date: dateString },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (blockedDates.includes(dateString)) {
        setBlockedDates(blockedDates.filter((date) => date !== dateString));
      } else {
        setBlockedDates([...blockedDates, dateString]);
      }
    } catch (error) {
      console.error("Error updating blocked date:", error);
    }
  };

  const handleAcceptReject = async (id, status) => {
    console.log(id);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/bookings/statusUpdate`,
      { id, status }
    );
    fetchNotifications();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isBlocked = isDateBlocked(currentYear, currentMonth, day);
      const isPast =
        new Date(currentYear, currentMonth, day) <
        new Date().setHours(0, 0, 0, 0);

      days.push(
        <button
          key={day}
          onClick={() =>
            !isPast && toggleDateBlock(currentYear, currentMonth, day)
          }
          disabled={isPast}
          className={`h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 ${
            isPast
              ? "text-gray-300 cursor-not-allowed"
              : isBlocked
              ? "bg-red-500 text-white hover:bg-red-600"
              : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const navigateMonth = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {/* Desktop Header */}
        <header className="flex flex-row items-center justify-between px-8 py-6 bg-white border-b border-gray-200">
          <div className="">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Vendor Dashboard
            </h1>
            <p className="text-sm md:text-gray-600">
              Manage your bookings and availability
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/package-management"
              className=" p-2  font-semibold  md:flex items-center text-white bg-emerald-600 rounded md:hover:bg-red-50 md:hover:text-emerald-600  hover:border-emerald-600  hover:border-2"
            >
              <span>Manage Packages</span>
            </Link>
            <Link
              to="/logout"
              className="w-20 p-2  font-semibold  md:flex items-center text-white bg-red-600 rounded md:hover:bg-red-50 md:hover:text-red-600 hover:border-red-600 hover:border-2"
            >
              <span>Log Out</span>
            </Link>
          </div>
        </header>

        <div className="p-6 md:p-8 overflow-y-auto h-full">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Requests
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {notifications.filter((n) => n.status === "pending").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Accepted Bookings
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {
                      notifications.filter((n) => n.status === "accepted")
                        .length
                    }
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Blocked Dates
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {blockedDates.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Notifications Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">
                    Service Requests
                  </h2>
                  <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
                    {notifications.filter((n) => n.status === "pending").length}{" "}
                    Pending
                  </span>
                </div>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  {notifications.reverse().map((notification, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        notification.status === "pending"
                          ? "border-orange-200 bg-orange-50"
                          : notification.status === "accepted"
                          ? "border-green-200 bg-green-50"
                          : "border-red-200 bg-red-50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <Package className="w-5 h-5 text-pink-500 mr-2" />
                          <h3 className="font-semibold text-gray-800">
                            {notification.packageName}
                          </h3>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            notification.status === "pending"
                              ? "bg-orange-100 text-orange-600"
                              : notification.status === "accepted"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {notification.status.charAt(0).toUpperCase() +
                            notification.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                          <span className="font-medium">
                            {notification.pricing}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                          <span>{notification.eventDate}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2 text-pink-500" />
                          <span>{notification.customerPhone}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-2 text-red-500" />
                          <span>{notification.venue}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-4 bg-white p-3 rounded-lg">
                        {notification.eventDetails}
                      </p>

                      {notification.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleAcceptReject(notification.id, "accepted")
                            }
                            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              handleAcceptReject(notification.id, "rejected")
                            }
                            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors font-medium"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Calendar Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">
                  Booking Availability
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Click dates to block/unblock bookings
                </p>
              </div>
              <div className="p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => navigateMonth("prev")}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {monthNames[currentMonth]} {currentYear}
                  </h3>
                  <button
                    onClick={() => navigateMonth("next")}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="h-10 flex items-center justify-center text-sm font-medium text-gray-500"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

                {/* Legend */}
                <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                    <span className="text-gray-600">Blocked</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                    <span className="text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                    <span className="text-gray-600">Past</span>
                  </div>
                </div>

                {/* Blocked Dates Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Currently Blocked Dates:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {blockedDates.map((date) => (
                      <span
                        key={date}
                        className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm"
                      >
                        {new Date(date).toLocaleDateString()}
                      </span>
                    ))}
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

export default VendorDashboard;
