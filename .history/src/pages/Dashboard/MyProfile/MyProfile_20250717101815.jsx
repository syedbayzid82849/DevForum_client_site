// AdminProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AdminPieChart from "../../../components/AdminProfile/AdminPI";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const AdminProfilePage = ({ user }) => {
    const axiosSecure = useAxiosSecure();
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);

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
            Swal.fire("Failed to add tag", "", "error");
        }
    };

    const pieData = [
        { name: "Posts", value: stats.posts || 0 },
        { name: "Comments", value: stats.comments || 0 },
        { name: "Users", value: stats.users || 0 },
    ];

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6">Admin Profile</h2>

            {/* Profile Card */}
            <div className="flex items-center gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6">
                <img src={user?.photoURL} alt="Admin" className="w-20 h-20 rounded-full border-2" />
                <div>
                    <h3 className="text-xl font-semibold">{user?.displayName}</h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    <p>Total Posts: {stats.posts || 0}</p>
                    <p>Total Comments: {stats.comments || 0}</p>
                    <p>Total Users: {stats.users || 0}</p>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6">
                <h4 className="text-lg font-semibold mb-4">Site Overview</h4>
                <AdminPieChart sta>
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

                {/* Tag list (optional display) */}
                <div className="mt-4">
                    <h5 className="font-medium">Existing Tags:</h5>
                    <ul className="list-disc ml-5 text-sm mt-2">
                        {tags.map((t, i) => (
                            <li key={i}>{t.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminProfilePage;