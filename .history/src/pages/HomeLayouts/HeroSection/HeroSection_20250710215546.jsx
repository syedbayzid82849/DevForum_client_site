// HeroSection.jsx
import React from "react";
import BannerSearch from "../../../h";
import backgroundImage from "../../../assets/hero-bg.jpg"; // Adjust the path as necessary;

const HeroSection = () => {
    return (
        <div
            className="p-8 text-center bg-blue-100 bg-cover bg-center"
            style={{ backgroundImage:  }}
        >
            <h1>Welcome to the Pet Management Platform</h1>
            <p>Manage and explore pets easily with us</p>

            <BannerSearch />
        </div>
    );
}

export default HeroSection;
