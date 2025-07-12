// AllPosts.jsx
import { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown, FaCommentDots } from "react-icons/fa";

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const axiosSecure = useAxiosSecure// AllPosts.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { FaThumbsUp, FaThumbsDown, FaCommentDots } from "react-icons/fa";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 5;

  useEffect(() => {
    axios
      .get(`/posts?page=${page}&limit=${limit}`)
      .then((res) => {
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err));
  }, [page]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Posts</h2>

      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post._id} className="border rounded-xl p-4 bg-white shadow-md space-y-2">
            <div className="flex items-center gap-3">
              <img
                src={post.authorImage}
                alt="Author"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-semibold">{post.authorName}</h4>
                <small className="text-gray-500">{new Date(post.createdAt).toLocaleString()}</small>
              </div>
            </div>

            <h3 className="text-xl font-bold mt-2">{post.title}</h3>

            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags?.map((tag, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
              <div className="flex gap-4 items-center">
                <span className="flex items-center gap-1"><FaThumbsUp /> {post.upVotes?.length || 0}</span>
                <span className="flex items-center gap-1"><FaThumbsDown /> {post.downVotes?.length || 0}</span>
                <span className="flex items-center gap-1"><FaCommentDots /> {post.commentCount || 0}</span>
              </div>
              <button className="text-blue-600 hover:underline">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`px-3 py-1 border rounded ${
              page === num + 1 ? "bg-blue-600 text-white" : "bg-white text-blue-600"
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
(); // Assuming you have a custom hook for axios with auth

    const limit = 5;

    useEffect(() => {
        axios.get(`/posts?page=${page}&limit=${limit}`)
            .then((res) => {
                setPosts(res.data.posts);
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => console.error(err));
    }, [page]);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">All Posts</h2>

            <div className="grid gap-6">
                {posts.map((post) => (
                    <div key={post._id} className="border rounded-xl p-4 bg-white shadow-md space-y-2">
                        <div className="flex items-center gap-3">
                            <img
                                src={post.authorImage}
                                alt="Author"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h4 className="font-semibold">{post.authorName}</h4>
                                <small className="text-gray-500">{new Date(post.createdAt).toLocaleString()}</small>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mt-2">{post.title}</h3>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {post.tags?.map((tag, idx) => (
                                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                            <div className="flex gap-4 items-center">
                                <span className="flex items-center gap-1"><FaThumbsUp /> {post.upVotes?.length || 0}</span>
                                <span className="flex items-center gap-1"><FaThumbsDown /> {post.downVotes?.length || 0}</span>
                                <span className="flex items-center gap-1"><FaCommentDots /> {post.commentCount || 0}</span>
                            </div>
                            <button className="text-blue-600 hover:underline">View Details</button>
                        </div>
                    </div>
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
