import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {} } = useQuery({
        queryKey: ["admin-dashboard"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-dashboard");
            return res.data;
        },
    });

    const lineData = [
        { name: "Posts", value: data.totalPosts || 0 },
        { name: "Users", value: data.totalUsers || 0 },
        { name: "Announcements", value: data.totalAnnouncements || 0 },
    ];

    return (
        <div>
            <h2 className="text-xl font-bold max-w-7xl mx-auto mb-4">Admin Dashboard</h2>
            <ResponsiveContainer className={} height={300}>
                <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>


        </div>
    );
};

export default AdminDashboard;
