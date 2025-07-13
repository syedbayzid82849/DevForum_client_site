// src/pages/HomeLayouts/AllPosts/AllPosts.jsx
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PostCard from "../../../components/PostCard/PostCard";

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const axiosSecure = useAxiosSecure();

    const limit = 5;

    useEffect(() => {
        axiosSecure
            .get(`/posts?page=${page}&limit=${limit}`)
            .then((res) => {
                setPosts(res.data.posts);
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => console.error(err));
    }, [page, axiosSecure]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">All Posts</h2>

            {/* Posts Section */}
            <div className="md:grid md:gap-6 sm:grid-cols-2">
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post) => <PostCard key={post._id} post={post} />)
                ) : (
                    <p className="text-center text-gray-500">No posts found</p>
                )}
            </div>

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
