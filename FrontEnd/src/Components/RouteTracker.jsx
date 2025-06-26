// src/components/RouteTracker.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const excluded = ["/book-service", "/booking-success"];
    if (!excluded.includes(location.pathname)) {
      localStorage.setItem("lastVisitedRoute", location.pathname);
    }
  }, [location]);

  return null;
};

export default RouteTracker;
