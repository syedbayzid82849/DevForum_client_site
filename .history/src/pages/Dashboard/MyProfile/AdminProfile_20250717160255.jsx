import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { toast } from "react-toastify";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const [tag, setTag] = useState("");
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isPending } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-stats");
            return res.data;
        },
    });

    const pieData = [
        { name: "Posts", value: stats.postCount || 0 },
        { name: "Comments", value: stats.commentCount || 0 },
        { name: "Users", value: stats.userCount || 0 },
    ];

    const handleAddTag = async () => {
        if (!tag) return;
        try {
            const res = await axiosSecure.post("/tags", { name: tag });
            if (res.data.insertedId) {
                toast.success("Tag added successfully!");
                setTag("");
            }
        } catch (error) {
            toast.error("Failed to add tag.");
        }
    };

    if (isPending) return <p>Loading admin stats...</p>;

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold">Admin Profile</h2>
            <div className="flex items-center gap-4">
                <img src={user?.photoURL} className="w-16 h-16 rounded-full" />
                <div>
                    <p className="font-semibold">Name: {user?.displayName || "N/A"}</p>
                    <p>Email: {user?.email}</p>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold mb-2">Admin Stats</h3>
                <div className="w-full max-w-sm">
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
