// AdminProfilePage.jsx
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AdminPieChart from "../../../components/AdminProfile/AdminPI";
import { AuthContext } from "../../../context/AuthContext";
import useUserRole from "../../../hooks/useUserRole";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const AdminProfilePage = () => {
    const axiosSecure = useAxiosSecure();
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const { user } = useContext(AuthContext);
    const { role, loading } = useUserRole(user?.email);

    if (loading) {
        return <LoadingSpinner />;
    }

    // Get stats: posts, comments, users
    const { data: stats = {}, refetch } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-stats");
            return res.data;
        },
    });
    

    // Get total tag list
    useEffect(() => {
        axiosSecure.get("/tags").then((res) => setTags(res.data));
    }, [axiosSecure]);

    // Add new tag
    const handleAddTag = async (e) => {
        e.preventDefault();
        if (!tag.trim()) return;

        try {
            const res = await axiosSecure.post("/tags", { name: tag });
            if (res.data.insertedId) {
                Swal.fire("Tag added successfully", "", "success");
                setTag("");
                setTags([...tags, { name: tag }]);
            }
        } catch (error) {
            console.log(error);
            Swal.fire("Failed to add tag", "", "error");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6">Admin Profile</h2>

            {/* Profile Card */}
            <div className="flex items-center gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6">
                <img
                    src={user?.photoURL}
                    alt="Admin"
                    className="w-20 h-20 rounded-full border-2"
                />
                <div>
                    <h3 className="text-xl font-semibold">{user?.displayName}</h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    {role === "admin" && (
                        <>
                            <p>Total Posts: {stats.posts || 0}</p>
                            <p>Total Comments: {stats.comments || 0}</p>
                            <p>Total Users: {stats.users || 0}</p>
                        </>
                    )}
                </div>
            </div>

            {role === "admin" && (
                <>
                    {/* Pie Chart */}
                    <div className="bg-white mx-auto dark:bg-gray-800 p-6 rounded-xl shadow mb-6">
                        <h4 className="text-lg font-semibold mb-4 mx-auto">Site Overview</h4>
                        <AdminPieChart stats={stats} />
                    </div>

                    {/* Add Tag */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                        <h4 className="text-lg font-semibold mb-4">Add New Tag</h4>
                        <form onSubmit={handleAddTag} className="flex gap-4 items-center">
                            <input
                                type="text"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                placeholder="Enter tag name"
                                className="input input-bordered"
                            />
                            <button type="submit" className="btn btn-primary">
                                Add Tag
                            </button>
                        </form>

                        <div className="mt-4">
                            <h5 className="font-medium">Existing Tags:</h5>
                            <ul className="list-disc ml-5 text-sm mt-2">
                                {tags.map((t, i) => (
                                    <li key={i}>{t.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}
                        {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-xl">
                        <h3 className="text-xl font-bold mb-4 text-center">
                            Update Profile
                        </h3>
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="input input-bordered"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="photoURL"
                                placeholder="Photo URL"
                                className="input input-bordered"
                                value={formData.photoURL}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="aboutMe"
                                placeholder="About Me"
                                className="textarea textarea-bordered"
                                value={formData.aboutMe}
                                onChange={handleChange}
                            ></textarea>
                            <input
                                type="url"
                                name="twitter"
                                placeholder="Twitter URL"
                                className="input input-bordered"
                                value={formData.twitter}
                                onChange={handleChange}
                            />
                            <input
                                type="url"
                                name="linkedin"
                                placeholder="LinkedIn URL"
                                className="input input-bordered"
                                value={formData.linkedin}
                                onChange={handleChange}
                            />
                            <input
                                type="url"
                                name="github"
                                placeholder="GitHub URL"
                                className="input input-bordered"
                                value={formData.github}
                                onChange={handleChange}
                            />
                            <div className="flex justify-between mt-4">
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline btn-error"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProfilePage;
