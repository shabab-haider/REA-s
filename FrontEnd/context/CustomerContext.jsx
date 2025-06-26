import React, { createContext, useState } from "react";
import { useEffect } from "react";
export const CustomerDataContext = createContext();

const CustomerContext = ({ children }) => {
  const [customer, setCustomer] = useState(() => {
    const storedcustomer = localStorage.getItem("customer");
    return storedcustomer ? JSON.parse(storedcustomer) : null;
  });
  useEffect(() => {
    if (customer) {
      localStorage.setItem("customer", JSON.stringify(customer));
    }
  }, [customer]);
  return (
    <>
      <CustomerDataContext.Provider value={{ customer, setCustomer }}>
        {children}
      </CustomerDataContext.Provider>
    </>
  );
};

export default CustomerContext;
