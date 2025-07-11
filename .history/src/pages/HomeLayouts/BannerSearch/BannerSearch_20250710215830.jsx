import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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
        enabled: false, // Auto fetch বন্ধ
    });

    const handleSearch = () => {
        if (searchTag.trim()) {
            refetch();
        }
    };

    return (
        <div className="p-4  text-center">
            <input
                type="text"
                placeholder="Search by tag..."
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                className="input input-bordered w-60"
            />
            <button onClick={handleSearch} className="btn btn-primary ml-2">
                Search
            </button>

            <div className="mt-4">
                {isLoading && <p>Loading...</p>}
                {isError && <p>Something went wrong.</p>}
                {!isLoading && results.length === 0 && <p>No posts found.</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {results.map((post) => (
                        <div key={post._id} className="card bg-white p-4 shadow-md">
                            <h2 className="text-xl font-bold">{post.title}</h2>
                            <p className="text-sm text-gray-600">Tags: {post.tags?.join(", ")}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BannerSearch;
