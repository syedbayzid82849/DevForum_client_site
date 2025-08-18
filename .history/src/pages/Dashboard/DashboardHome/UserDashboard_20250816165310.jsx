import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data = {} } = useQuery({
        queryKey: ["user-dashboard", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-dashboard/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });


    return (
        <div>

        </div>
    );
};

export default UserDashboard;