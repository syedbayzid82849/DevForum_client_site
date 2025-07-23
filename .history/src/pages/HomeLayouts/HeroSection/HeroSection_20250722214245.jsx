import React, { useState, useCallback } from "react";
import BannerSearch from "../BannerSearch/BannerSearch";

const HeroSection = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);

    // Optional: useCallback prevents re-creating functions on each render
    const handleSetSearchResult = useCallback((data) => setSearchResult(data), []);
    const handleSetSearchLoading = useCallback((status) => setSearchLoading(status), []);
    const handleSetSearchError = useCallback((error) => setSearchError(error), []);

    return (
        <div className="bg-base-200 py-10">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Welcome to the Pet Management Platform
                    </h1>
                    <p className="text-lg text-gray-500">
                        Manage and explore pets easily with us
                    </p>
                </div>

                <div className="mt-10">
                    <BannerSearch
                        setSearchResult={handleSetSearchResult}
                        setSearchLoading={handleSetSearchLoading}
                        setSearchError={handleSetSearchError}
                    />
                </div>

                {/* Display Results */}
                <div className="mt-10">
                    {searchLoading && <p className="text-yellow-500 text-center">Loading...</p>}
                    {searchError && <p className="text-red-500 text-center">{searchError}</p>}
                    {!searchLoading && !searchError && searchResult?.length === 0 && (
                        <p className="text-center text-gray-500">No results found.</p>
                    )}
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                        {searchResult?.map((item) => (
                            <div key={item._id} className="bg-white p-4 rounded shadow">
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
