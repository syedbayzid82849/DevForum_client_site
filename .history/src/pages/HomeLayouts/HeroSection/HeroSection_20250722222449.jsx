import React, { useState, useCallback } from "react"; // useState এবং useCallback ইম্পোর্ট করুন
import BannerSearch from "../BannerSearch/BannerSearch";
import backgroundImage from "../../../assets/hero-img.jpg";
import SearchResults from "../SearchResults/SearchResults"; // SearchResults কম্পোনেন্ট ইম্পোর্ট করুন

const HeroSection = () => { // props আর দরকার নেই, কারণ স্টেট এখানে থাকবে
    const [searchResult, setSearchResult] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(false);

    // useCallback ব্যবহার করে ফাংশনগুলোকে মেমোরাইজ করুন
    const memoizedSetSearchResult = useCallback((data) => {
        setSearchResult(data);
    }, []); // কোনো নির্ভরতা নেই, তাই রেফারেন্স পরিবর্তন হবে না

    const memoizedSetSearchLoading = useCallback((loading) => {
        setSearchLoading(loading);
    }, []); // কোনো নির্ভরতা নেই

    const memoizedSetSearchError = useCallback((error) => {
        setSearchError(error);
    }, []); // কোনো নির্ভরতা নেই

    return (
        <>
            <div
                className="text-center bg-cover bg-center flex flex-col items-center justify-center"
                style={{ backgroundImage: `url(${backgroundImage})`, minHeight: "500px" }}
            >
                <div className="p-5 max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900">Welcome to the Pet Management Platform</h1>
                    <p className="text-xl text-gray-900">Manage and explore pets easily with us</p>
                </div>
                <BannerSearch
                    setSearchResult={memoizedSetSearchResult}
                    setSearchLoading={memoizedSetSearchLoading}
                    setSearchError={memoizedSetSearchError}
                />
            </div>
            {/* SearchResults কম্পোনেন্ট এখানে রেন্ডার করুন */}
            <SearchResults
                results={searchResult}
                isLoading={searchLoading}
                isError={searchError}
            />
        </>
    );
};

export default HeroSection;