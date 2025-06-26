import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  localStorage.clear();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      Loading....
    </div>
  );
};
export default Logout;
