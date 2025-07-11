import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import SearchResults from "../SearchResults/SearchResults";

const BannerSearch = () => {
    const [searchTag, setSearchTag] = useState("");
    const axiosSecure = useAxiosSecure();

    const {
        data: results = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["posts", searchTag],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/search?tag=${encodeURIComponent(searchTag)}`);
            return res.data;
        },
        enabled: false,
    });

    const handleSearch = () => {
        if (searchTag.trim()) {
            refetch();
        }
    };

    const handleTagClick = (tag) => {
        setSearchTag(tag);
        refetch();
    };

    const { data: tags = [], isLoading: tagsLoading, isError: tagsError } = useQuery({
        queryKey: ["all-tags"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tags");
            return res.data;
        }
    });

    if (tagsLoading) return <LoadingSpinner />;
    if (tagsError) return <p className="text-center text-red-500">Failed to load tags.</p>;


    return (
        <div className=" text-center">
            <input
                type="text"
                placeholder="Search by tag..."
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                className="input input-bordered w-60"
            />
            <button onClick={handleSearch} className="btn btn-primary sm:mt-2 ml-2">
                Search
            </button>

            <div className="mt-4">
                {isLoading && <p>Loading...</p>}
                {isError && <p>Something went wrong.</p>}
                {!isLoading && results.length === 0 && <p>No posts found.</p>}

                <div className="my-6 px-4">
                    <h2 className="text-xl font-semibold mb-3 text-left">🔖 Popular Tags</h2>
                    <div className="flex flex-wrap gap-3">
                        {tags.map((tag, i) => (
                            <button
                                key={i}
                                onClick={() => handleTagClick(tag)}
                                className="px-3 py-1  bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
            {/* Search Results Component */}
            <SearchResults results={results} isLoading={isLoading} isError={isError} />
        </div>
    );
}

export default BannerSearch;
