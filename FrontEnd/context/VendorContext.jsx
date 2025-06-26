import React, { createContext, useState } from "react";
import { useEffect } from "react";
export const VendorDataContext = createContext();

const VendorContext = ({ children }) => {
  const [vendor, setVendor] = useState(() => {
    const storedvendor = localStorage.getItem("vendor");
    return storedvendor ? JSON.parse(storedvendor) : null;
  });
  useEffect(() => {
    if (vendor) {
      localStorage.setItem("vendor", JSON.stringify(vendor));
    }
  }, [vendor]);
  return (
    <>
      <VendorDataContext.Provider value={{ vendor, setVendor }}>
        {children}
      </VendorDataContext.Provider>
    </>
  );
};

export default VendorContext;
