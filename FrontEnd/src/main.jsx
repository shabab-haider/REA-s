import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerContext from "../context/CustomerContext.jsx";
import VendorContext from "../context/VendorContext.jsx";
import RouteTracker from "./Components/RouteTracker.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RouteTracker />
    <VendorContext>
      <CustomerContext>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </CustomerContext>
    </VendorContext>
  </BrowserRouter>
);
