import { useQuery } from "@tanstack/react-query";
import { FaComments, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";

const MyPosts = () => {
    const axiosSecure = useAxiosSecure();
    const user = useContext(AuthContext);

    const { data: posts = [], refetch } = useQuery({
        queryKey: ["myPosts", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/user?email=${user?.email}`);
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure to delete this post?");
        if (!confirm) return;

        try {
            await axiosSecure.delete(`/posts/${id}`);
            refetch();
            toast.success("Post deleted");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My Posts</h2>

            <div className="overflow-x-auto">
                <table className="table w-full text-sm">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Post Title</th>
                            <th>Votes</th>
                            <th>Comments</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {posts.map((post, index) => (
                            <tr key={post._id}>
                                <td>{index + 1}</td>
                                <td>{post.title}</td>
                                <td>{post.votes}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-info"
                                        onClick={() => window.location.href = `/posts/${post._id}`}
                                    >
                                        <FaComments /> Comment
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDelete(post._id)}
                                    >
                                        <FaTrashAlt /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {posts.length === 0 && (
                    <p className="text-center mt-4">No posts found.</p>
                )}
            </div>
        </div>
    );
};

export default MyPosts;
