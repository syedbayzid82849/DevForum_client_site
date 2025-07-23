import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    
    const axiosSecure = useAxiosSecure();

    const { data = {} } = useQuery({
        queryKey: ["user-dashboard", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/user-dashboard/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const dataChart = [{ name: "My Posts", value: data.postCount || 0 }];

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">User Dashboard</h2>
            <PieChart width={400} height={300}>
                <Pie
                    data={dataChart}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                >
                    <Cell fill="#82ca9d" />
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default UserDashboard;