// HeroSection.jsx
import React from "react";
import BannerSearch from "../BannerSearch/BannerSearch";
import backgroundImage from "../../../assets/hero-img.jpg"; 

const HeroSection = () => {
    return (
        <div
            className="p-8 text-center  bg-cover bg-center flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${backgroundImage})`, minHeight: "500px" }}
        >
            <h1 className="text-4xl font-bold text-g">Welcome to the Pet Management Platform</h1>
            <p className="text-lg text-gray-300">Manage and explore pets easily with us</p>

            <BannerSearch />
        </div>
    );
}

export default HeroSection;
