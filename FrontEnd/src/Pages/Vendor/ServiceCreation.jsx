import React, { useContext } from "react";
import { VendorDataContext } from "../../../context/VendorContext";
import VenueServiceCreation from "../../Components/VenueServiceCreation";
import PhotographyServiceCreation from "../../Components/PhotographyServiceCreation";
import SalonServiceCreation from "../../Components/SalonServiceCreation";
import TransportationServiceCreation from "../../Components/TransportationServiceCreation";

const ServiceCreation = () => {
  const { vendor, setVendor } = useContext(VendorDataContext);
  console.log(vendor.service.serviceName);
  if (vendor.service.serviceName == "venue") return <VenueServiceCreation />;
  if (vendor.service.serviceName == "photography")
    return <PhotographyServiceCreation />;
  if (vendor.service.serviceName == "salon") return <SalonServiceCreation />;
  if (vendor.service.serviceName == "transportation")
    return <TransportationServiceCreation />;
};

export default ServiceCreation;
