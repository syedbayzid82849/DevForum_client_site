import { FaComments, FaTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyPosts = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: posts = [], refetch } = useQuery({
        queryKey: ["myPosts", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/user?email=${user?.email}`);
            return res.data;
        },
    });
    console.log(posts);

    const handleDelete = async (id) => {
        console.log(id);
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#e11d48",
            cancelButtonColor: "#6b7280", 
        });
        if (confirm.isConfirmed) {
            try {
                axiosSecure.delete(`/posts/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Parcel has been deleted.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                            });
                        }
                        refetch();
                    })


            } catch (err) {
                Swal.fire("Error", err.message || "Failed to delete parcel", "error");
            }
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
