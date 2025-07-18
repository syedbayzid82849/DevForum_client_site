import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AdminStatsPieChart = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["siteStats"],
        queryFn: async () => {
            const [postRes, commentRes, userRes] = await Promise.all([
                axiosSecure.get("/posts/count"),
                axiosSecure.get("/comments/count"),
                axiosSecure.get("/users/count"),
            ]);
            return {
                posts: postRes.data.count,
                comments: commentRes.data.count,
                users: userRes.data.count,
            };
        },
    });

    if (isLoading) return <p>Loading stats...</p>;

    const data = [
        { name: "Posts", value: stats.posts },
        { name: "Comments", value: stats.comments },
        { name: "Users", value: stats.users },
    ];

    return (
        <div className="flex justify-center">
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default AdminStatsPieChart;