import React from "react";
import landingImage from "../assets/landing.svg";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <img
        src={landingImage}
        alt="Landing Page"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default LandingPage;
