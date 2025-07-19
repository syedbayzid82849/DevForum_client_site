// src/pages/HomeLayouts/AllPosts/AllPosts.jsx
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PostCard from "../../../components/PostCard/PostCard";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const AllPosts = () => {
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("newest");
    const axiosSecure = useAxiosSecure();
    const limit = 5;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["posts", page, sortBy],
        queryFn: async () => {
            const endpoint =
                sortBy === "popular"
                    ? `/posts/popular?page=${page}&limit=${limit}`
                    : `/posts?page=${page}&limit=${limit}`;
            const res = await axiosSecure.get(endpoint);
            console.log(res);
            return res.data;
        },
        keepPreviousData: true, 
    });

    const posts = data?.posts || [];
    const totalPages = data?.totalPages || 1;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">All Posts</h2>

            {/* Dropdown Sort Selector */}
            <div className="flex justify-center mb-4">
                <select
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value);
                        setPage(1); 
                    }}
                    className="border border-blue-500 px-4 py-2 rounded-md text-blue-600"
                >
                    <option value="newest">Sort by Newest</option>
                    <option value="popular">Sort by Popularity</option>
                </select>
            </div>

            {/* Loading/Error Handling */}
            {isLoading && <LoadingSpinner />}
            {isError && <p className="text-center text-red-500">Failed to load posts.</p>}

            {/* Posts Section */}
            {!isLoading && posts.length > 0 ? (
                <div className="flex flex-col gap-6">
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            ) : (
                !isLoading && (
                    <p className="text-center text-gray-500">No posts found</p>
                )
            )}

            {/* Pagination Section */}
            <div className="flex flex-wrap justify-center mt-8 gap-2">
                {[...Array(totalPages).keys()].map((num) => (
                    <button
                        key={num}
                        onClick={() => setPage(num + 1)}
                        className={`px-3 py-1 border rounded ${page === num + 1
                            ? "bg-blue-600 text-white"
                            : "bg-white text-blue-600"
                            }`}
                    >
                        {num + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllPosts;
