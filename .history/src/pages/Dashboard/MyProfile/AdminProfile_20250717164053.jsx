import { useContext, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import UserProfile from "./UserProfile";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const AdminProfile = () => {
    const [tag, setTag] = useState("");
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isPending } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-stats");
            return res.data;
        },
    });

    stats

    const pieData = [
        { name: "Posts", value: stats.post || 0 },
        { name: "Comments", value: stats.commentCount || 0 },
        { name: "Users", value: stats.userCount || 0 },
    ];
    console.log(pieData);

    const handleAddTag = async () => {
        if (!tag) return;
        try {
            const res = await axiosSecure.post("/tags", { name: tag });
            if (res.data.insertedId) {
                toast.success("Tag added successfully!");
                setTag("");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add tag.");
        }
    };

    if (isPending) return <p>Loading admin stats...</p>;

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold">Admin Profile</h2>
            <UserProfile></UserProfile>

            <div>
                <h3 className="text-xl font-bold mb-2">Admin Stats</h3>
                <div className="w-full max-w-sm h-[300px] flex justify-center items-center bg-base-100 rounded-xl shadow">
                    <PieChart width={300} height={250}>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
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
            </div>


            <div>
                <h3 className="text-xl font-bold mb-2">Add New Tag</h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        placeholder="Enter tag"
                        className="input input-bordered"
                    />
                    <button onClick={handleAddTag} className="btn btn-primary">
                        Add Tag
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
