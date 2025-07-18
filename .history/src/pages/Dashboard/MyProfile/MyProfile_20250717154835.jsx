import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminStatsPieChart from "../../../components/AdminStatsPieChart/AdminStatsPieChart";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyProfile = () => {
    const { user, dbUser } = useContext(AuthContext);
    const {axiosSecure{ = useAxiosSecure();

    const {
        data: stats = { posts: 0, comments: 0, users: 0 },
        isLoading,
    } = useQuery({
        queryKey: ["site-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/site-stats");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <span className="loading loading-dots loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col md:flex-row items-center gap-6">
                <img
                    src={user?.photoURL || "https://i.ibb.co/vxnvzG1/user.png"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-primary object-cover"
                />
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold text-primary">{user?.displayName || "Name: None"}</h2>
                    <p className="text-lg mt-2">
                        <span className="font-semibold">Email:</span> {user?.email}
                    </p>
                    <p className="text-lg mt-1">
                        <span className="font-semibold">Badge:</span>{" "}
                        {dbUser?.badge === "gold"
                            ? "🥇 Gold"
                            : dbUser?.badge === "bronze"
                                ? "🥉 Bronze"
                                : "None"}
                    </p>
                </div>
            </div>

            {dbUser?.role === "admin" && (
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>
                    <AdminStatsPieChart stats={stats} />
                    <AddTag />
                </div>
            )}
        </div>
    );
};

export default MyProfile;
