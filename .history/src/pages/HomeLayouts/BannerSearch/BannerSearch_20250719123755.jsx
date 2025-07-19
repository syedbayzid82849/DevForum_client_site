import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const BannerSearch = () => {
    const [tag, setTag] = useState(""); // ইউজার ইনপুটের জন্য
    const [searchTag, setSearchTag] = useState(""); // সার্চ ট্রিগার করার জন্য

    const {
        data: posts = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["posts", searchTag],
        queryFn: async () => {
            if (!searchTag) return [];
            const res = await axios.get(`http://localhost:5000/posts/search?tag=${searchTag}`);
            return res.data;
        },
        enabled: !!searchTag, // শুরুতে রান করবে না, tag দিলে তারপর চালু হবে
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTag(tag);
        refetch(); // চাইলে refetch দিতে পারো
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Search Posts by Tag</h2>

            <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Enter tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="input input-bordered w-full"
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {isLoading && <p>Loading...</p>}
            {isError && <p className="text-red-500">Error: {error.message}</p>}

            <div className="space-y-3">
                {posts.length === 0 && searchTag && !isLoading ? (
                    <p className="text-gray-500">No posts found for tag: <strong>{searchTag}</strong></p>
                ) : (
                    posts.map((post) => (
                        <div key={post._id} className="p-4 border rounded shadow">
                            <h3 className="text-lg font-semibold">{post.title}</h3>
                            <p>{post.description}</p>
                            <p className="text-sm text-gray-500 mt-1">Tags: {post.tags?.join(", ")}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BannerSearch;
