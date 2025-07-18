import React, { useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import AddNewTag from "./AddNewTag";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useUserRole from "../../hooks/useUserRole";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();
    const [role] = useUserRole();

    // Fetch user data by email
    const { data: dbUser = {}, refetch } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Fetch site stats
    const { data: stats = {} } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-stats");
            return res.data;
        },
        enabled: role === "admin",
    });

    // Badge logic
    const badge =
        dbUser?.role === "admin"
            ? { label: "Gold", icon: "/src/assets/gold-Badge.png" }
            : { label: "Bronze", icon: "/src/assets/bronze-Badge.png" };

    // Pie chart data
    const pieData = [
        { name: "Users", value: stats?.users || 0 },
        { name: "Posts", value: stats?.posts || 0 },
        { name: "Comments", value: stats?.comments || 0 },
    ];
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800">
                <div className="flex flex-col items-center">
                    <img
                        className="w-32 h-32 rounded-full object-cover"
                        src={dbUser?.photoURL || "/default-avatar.png"}
                        alt={dbUser?.name}
                    />
                    <h2 className="mt-4 text-xl font-bold dark:text-white">
                        {dbUser?.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">{dbUser?.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <img src={badge.icon} className="w-6 h-6" alt={badge.label} />
                        <span className="text-sm font-semibold dark:text-white">
                            {badge.label}
                        </span>
                    </div>
                    <button
                        onClick={() => setEditModalOpen(true)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                    >
                        <MdModeEditOutline />
                        Edit Profile
                    </button>
                </div>

                {/* About Me */}
                {dbUser?.aboutMe && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold dark:text-white">About Me</h3>
                        <p className="text-gray-700 dark:text-gray-300">{dbUser.aboutMe}</p>
                    </div>
                )}

                {/* Social Links */}
                <div className="mt-6 flex gap-4">
                    {dbUser?.github && (
                        <a
                            href={dbUser.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-black dark:text-white"
                        >
                            <FaGithub size={24} />
                        </a>
                    )}
                    {dbUser?.linkedin && (
                        <a
                            href={dbUser.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-blue-600 dark:text-white"
                        >
                            <FaLinkedin size={24} />
                        </a>
                    )}
                    {dbUser?.twitter && (
                        <a
                            href={dbUser.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-sky-400 dark:text-white"
                        >
                            <FaTwitter size={24} />
                        </a>
                    )}
                </div>

                {/* Only Admin: Site Overview + Add Tag */}
                {role === "admin" && (
                    <div className="mt-10">
                        <h2 className="text-xl font-semibold dark:text-white mb-4">
                            📊 Site Overview
                        </h2>
                        <div className="flex justify-center">
                            <PieChart width={300} height={250}>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-2 dark:text-white">
                                🏷️ Add New Tag
                            </h2>
                            <AddNewTag />
                        </div>
                    </div>
                )}
            </div>

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
