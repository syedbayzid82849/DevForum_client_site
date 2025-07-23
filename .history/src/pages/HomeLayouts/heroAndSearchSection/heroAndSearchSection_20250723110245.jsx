import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import backgroundImage from "../../../assets/hero-img.jpg";
import PostCard from "../../../components/PostCard/PostCard";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const HeroAndSearchSection = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTag, setSearchTag] = useState("");
    const [showResults, setShowResults] = useState(false);

    const {
        data: searchResults = [],
        isLoading: searchLoading,
        isError: searchError,
        refetch: refetchSearch,
    } = useQuery({
        queryKey: ["search-posts", searchTag],
        enabled: false, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/search?tag=${encodeURIComponent(searchTag)}`);
            return res.data;
        },
    });

    const handleSearch = () => {
        if (!searchTag.trim()) return;
        setShowResults(true);
        refetchSearch();
    };

    const handleTagClick = (tag) => {
        setSearchTag(tag);
        setShowResults(true);
        refetchSearch();
    };

    const {
        data: tags = [],
        isLoading: tagsLoading,
        isError: tagsError,
    } = useQuery({
        queryKey: ["all-tags"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tags");
            return res.data;
        },
    });

    return (
        <div>

            {/* 🔵 Section 1: Banner + Search */}
            <div
                className="text-center bg-cover bg-center flex flex-col items-center justify-center"
                style={{ backgroundImage: `url(${backgroundImage})`, minHeight: "500px" }}
            >
                <div className="p-5 max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900">Welcome to the Pet Management Platform</h1>
                    <p className="text-xl text-gray-900">Manage and explore pets easily with us</p>
                </div>

                <div className="relative w-60 mx-auto">
                    <input
                        type="text"
                        placeholder="Search by tag..."
                        value={searchTag}
                        onChange={(e) => setSearchTag(e.target.value)}
                        className="input input-bordered w-full pr-10"
                    />
                    {searchTag && (
                        <button
                            onClick={() => setSearchTag("")}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600"
                            title="Clear"
                        >
                            &times;
                        </button>
                    )}
                </div>
                <button onClick={handleSearch} className="btn btn-primary sm:mt-2 ml-2">
                    Search
                </button>
            </div>

            {/* 🟢 Section 2: Popular Tags */}
            <div className="my-6 px-4 text-center">
                <h2 className="text-3xl font-bold mb-6 text-center">🔖 Popular Tags</h2>
                {tagsLoading && <LoadingSpinner />}
                {tagsError && <p className="text-red-500">Failed to load tags.</p>}
                <div className="flex flex-wrap gap-3 justify-center">
                    {tags.map((tagObj, i) => (
                        <button
                            key={tagObj._id || i}
                            onClick={() => handleTagClick(tagObj.tag)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
                        >
                            #{tagObj.tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* 🟡 Section 3: Search Results */}
            {showResults && (
                <div className="mt-6 max-w-7xl mx-auto">
                    {searchLoading && <p className="text-center">Loading...</p>}
                    {searchError && <p className="text-center text-red-500">Something went wrong while searching.</p>}
                    {!searchLoading && searchResults.length === 0 && (
                        <p className="text-center text-gray-500">No posts found for <strong>{searchTag}</strong></p>
                    )}
                    {searchResults.length > 0 && (
                        <>
                            <h2 className="text-3xl font-bold mb-6 text-center">🔍 Search Results</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
                                {searchResults.map((post) => (
                                    <PostCard key={post._id} post={post} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default HeroAndSearchSection;
