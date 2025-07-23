import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {} } = useQuery({
        queryKey: ["admin-dashboard"],
        queryFn: async () => {
            const res = await axiosSecure.get("/api/admin-dashboard");
            return res.data;
        },
    });

    

    const pieData = [
        { name: "Posts", value: data.totalPosts || 0 },
        { name: "Users", value: data.totalUsers || 0 },
        { name: "Announcements", value: data.totalAnnouncements || 0 },
    ];

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
            <PieChart width={400} height={300}>
                <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                >
                    <Cell fill="#0088FE" />
                    <Cell fill="#00C49F" />
                    <Cell fill="#FFBB28" />
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default AdminDashboard;
