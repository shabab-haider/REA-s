import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/vendors/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {
          navigate("/login");
        });
    }
  }, [token]);
  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedWrapper;
