// Banner.jsx
import React from "react";
import BannerSearch from "../BannerSearch/BannerSearch";

const Banner = () => {
    return (
        <div style={{ padding: "2rem", backgroundColor: "#eef6ff", textAlign: "center" }}>
            <h1>Welcome to the Pet Management Platform</h1>
            <p>Manage and explore pets easily with us</p>

            <BannerSearch />
        </div>
    );
}

export default Banner;
