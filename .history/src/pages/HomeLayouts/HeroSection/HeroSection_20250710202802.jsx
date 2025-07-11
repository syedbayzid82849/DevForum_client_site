// HeroSection.jsx
import React from "react";

const HeroSection = () => {
    return (
        <div style={{ padding: "2rem", backgroundColor: "#eef6ff", textAlign: "center" }}>
            <h1>Welcome to the Pet Management Platform</h1>
            <p>Manage and explore pets easily with us</p>

            <HeroSectionSearch />
        </div>
    );
}

export default HeroSection;
