// AllPosts.jsx
import { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown, FaCommentDots } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const axiosSecure = useAxiosSecure(); 

    const limit = 5;

    useEffect(() => {
        axiosSecure.get(`/posts?page=${page}&limit=${limit}`)
            .then((res) => {
                setPosts(res.data.posts);
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => console.error(err));
    }, [page, axiosSecure]);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">All Posts</h2>

            <div className="grid gap-6">
                {posts.map((post) => (
                    <P
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2">
                {[...Array(totalPages).keys()].map((num) => (
                    <button
                        key={num}
                        onClick={() => setPage(num + 1)}
                        className={`px-3 py-1 border rounded ${page === num + 1 ? "bg-blue-600 text-white" : "bg-white text-blue-600"
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
