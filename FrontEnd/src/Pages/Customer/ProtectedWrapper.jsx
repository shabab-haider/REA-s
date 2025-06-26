import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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
        .get(`${import.meta.env.VITE_BASE_URL}/customers/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          localStorage.setItem("customer", JSON.stringify(res.data.customer));
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
