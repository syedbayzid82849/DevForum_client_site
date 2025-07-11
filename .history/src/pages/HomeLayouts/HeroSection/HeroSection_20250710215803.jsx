// HeroSection.jsx
import React from "react";
import BannerSearch from "../BannerSearch/BannerSearch";
import backgroundImage from "../../../assets/hero-img.jpg"; 

const HeroSection = () => {
    return (
        <div
            className="p-8 text-center  bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})`, minHeight: "400px" }}
        >
            <h1>Welcome to the Pet Management Platform</h1>
            <p>Manage and explore pets easily with us</p>

            <BannerSearch />
        </div>
    );
}

export default HeroSection;
