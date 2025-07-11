// HeroSection.jsx
import React from "react";
import BannerSearch from "../BannerSearch/BannerSearch";

const HeroSection = () => {
    return (
        <div
            className="p-8 text-center bg-blue-100 bg-cover bg-center"
            style={{ backgroundImage: "url('//')" }}
        >
            <h1>Welcome to the Pet Management Platform</h1>
            <p>Manage and explore pets easily with us</p>

            <BannerSearch />
        </div>
    );
}

export default HeroSection;
