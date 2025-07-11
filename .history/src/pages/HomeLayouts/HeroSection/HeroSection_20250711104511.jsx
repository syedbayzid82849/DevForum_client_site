// HeroSection.jsx
import React from "react";
import BannerSearch from "../BannerSearch/BannerSearch";
import backgroundImage from "../../../assets/hero-img.jpg"; 

const HeroSection = () => {
    return (
        <div
            className=" text-center  bg-cover bg-center flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${backgroundImage})`, minHeight: "500px" }}
        >
<div></div>
            <BannerSearch />
        </div>
    );
}

export default HeroSection;
