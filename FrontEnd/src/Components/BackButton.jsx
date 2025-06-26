// src/components/Back.jsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    const lastRoute = localStorage.getItem("lastVisitedRoute");
    const current = window.location.pathname;

    if (lastRoute && lastRoute !== current) {
      navigate(lastRoute); // ✅ Go to saved route
    } else {
      window.history.length > 1 ? navigate(-1) : navigate("/"); // 🔄 Fallback
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      <span className="font-medium">Back</span>
    </button>
  );
};

export default BackButton;
