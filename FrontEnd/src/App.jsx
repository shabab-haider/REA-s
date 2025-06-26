import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/Home";
import RegisterVendor from "./Pages/Vendor/RegisterVendor";
import Login from "./Pages/Login";
import RegisterCustomer from "./Pages/Customer/RegisterCustomer";
import CustomerDashboard from "./Pages/Customer/Dashboard";
import VendorDashboard from "./Pages/Vendor/Dashboard";
import CustomerProtectedWrapper from "./Pages/Customer/ProtectedWrapper";
import VendorProtectedWrapper from "./Pages/Vendor/ProtectedWrapper";
import Logout from "./Pages/Logout";
import CustomerProfile from "./Pages/Customer/Profile";
import VenueBooking from "./Pages/Services/VenueBooking";
import PhotographyBooking from "./Pages/Services/PhotographyBooking";
import TransportationBooking from "./Pages/Services/TransportationBooking";
import SalonBooking from "./Pages/Services/SalonBooking";
import Services from "./Pages/Services/Services";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import BookService from "./Pages/BookService";
import ServicePackages from "./Pages/ServicePackages";
import ServiceCreation from "./Pages/Vendor/ServiceCreation";
import PackageCreation from "./Pages/Vendor/PackageCreation";
import VendorPackageManagement from "./Pages/Vendor/VendorPackageManagement";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/package-management"
          element={<VendorPackageManagement />}
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="register-vendor" element={<RegisterVendor />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="/venue-booking" element={<VenueBooking />} />
        <Route path="/photography-booking" element={<PhotographyBooking />} />
        <Route
          path="/transportation-booking"
          element={<TransportationBooking />}
        />
        <Route path="/salon-booking" element={<SalonBooking />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book-service" element={<BookService />} />
        <Route
          path="/service-packages/:vendorId"
          element={<ServicePackages />}
        />

        <Route path="/service-creation" element={<ServiceCreation />} />
        <Route path="/package-creation" element={<PackageCreation />} />

        <Route
          path="vendor-dashboard"
          element={
            <VendorProtectedWrapper>
              <VendorDashboard />
            </VendorProtectedWrapper>
          }
        />
      </Routes>
    </>
  );
}

export default App;
