import { useQuery } from "@tanstack/react-query";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
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
    console.log(user);

    const {
        totalPosts = 0,
        totalComments = 0,
        totalUpvotes = 0,
        totalDownvotes = 0,
        membership = "Free",
        recentPosts = [],
    } = data;
    console.log(recentPosts);

    return (
        <div className="p-6 space-y-6">
            {/* User Info */}
            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
                <img
                    src={user?.photoURL}
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full border"
                />
                <div>
                    <h2 className="text-2xl font-bold">{user?.displayName || "Anonymous"}</h2>
                    <p className="text-gray-500 py-2.5">{user?.email}</p>
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${user?.badge === "Gold"
                            ? "bg-yellow-400 text-black"
                            : "bg-gray-300 text-black"
                            }`}
                    >
                        {membership} Badge
                    </span>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-blue-100 p-4 rounded-xl shadow text-center">
                    <h3 className="text-lg font-bold">Posts</h3>
                    <p className="text-2xl">{totalPosts}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-xl shadow text-center">
                    <h3 className="text-lg font-bold">Comments</h3>
                    <p className="text-2xl">{totalComments}</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-xl shadow text-center">
                    <h3 className="text-lg font-bold">Upvotes</h3>
                    <p className="text-2xl">{totalUpvotes}</p>
                </div>
                <div className="bg-red-100 p-4 rounded-xl shadow text-center">
                    <h3 className="text-lg font-bold">Downvotes</h3>
                    <p className="text-2xl">{totalDownvotes}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl shadow text-center">
                    <h3 className="text-lg font-bold">Membership</h3>
                    <p className="text-2xl">{membership}</p>
                </div>
            </div>

            {/* Recent Posts */}
            {/* Recent Posts */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
                <h3 className="text-xl font-bold mb-3">Recent Posts</h3>
                {recentPosts.length > 0 ? (
                    <div className="space-y-4">
                        {recentPosts.map((post) => (
                            <div
                                key={post._id}
                                className="flex flex-col p-4 space-y-2 border rounded-lg shadow-sm dark:bg-gray-50 dark:text-gray-800"
                            >
                                {/* Author Info */}
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={post.authorPhoto || "https://source.unsplash.com/50x50/?portrait"}
                                        alt={post.authorName}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span className="font-semibold">{post.authorName || "Anonymous"}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-600">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* Post Content */}
                                {post.image && (
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-40 object-cover rounded-md"
                                    />
                                )}
                                <h4 className="font-bold">{post.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-500">
                                    {post.content.length > 100
                                        ? post.content.slice(0, 100) + "..."
                                        : post.content}
                                </p>

                                {/* Stats */}
                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-500">
                                    <span>Comments: {post.commentCount?.length || 0}</span>
                                    <span>Upvotes: {post.upVote?.length || 0}</span>
                                    <span>Downvotes: {post.downVote?.length || 0}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No recent posts.</p>
                )}
            </div>


            {/* Activity Chart */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
                <h3 className="text-xl font-bold mb-3">Activity Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={[
                            { name: "Posts", value: totalPosts },
                            { name: "Comments", value: totalComments },
                            { name: "Upvotes", value: totalUpvotes },
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default UserDashboard;
