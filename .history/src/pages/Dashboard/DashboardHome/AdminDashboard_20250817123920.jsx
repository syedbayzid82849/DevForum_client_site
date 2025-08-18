import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-dashboard");
      return res.data;
    },
  });

  // Example Admin Info (can fetch from usersCollection if needed)
  const adminInfo = {
    name: "Syed Bayzid",
    email: "syedbayzid@gmail.com",
    role: "admin",
    badge: "Gold",
    aboutMe: "Hello! I'm Syed Bayzid, a passionate and detail-oriented MERN Stack Developer.",
    github: "https://github.com/syedbayzid82849",
    linkedin: "https://www.linkedin.com/in/syed-bayzid-b91343329/",
    photoURL: "https://syed-bayzid.netlify.app/assets/SB-n1zkF2tC.jpg",
    twitter: "https://github.com/syedbayzid82849"
  };

  const lineData = [
    { name: "Posts", value: stats.totalPosts || 0 },
    { name: "Users", value: stats.totalUsers || 0 },
    { name: "Announcements", value: stats.totalAnnouncements || 0 },
  ];

  const pieData = [
    { name: "Posts", value: stats.totalPosts || 0 },
    { name: "Users", value: stats.totalUsers || 0 },
    { name: "Announcements", value: stats.totalAnnouncements || 0 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      
      {/* Admin Profile Card */}
      <div className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md">
        <img
          src={adminInfo.photoURL}
          alt={adminInfo.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{adminInfo.name}</h2>
          <p className="text-gray-600">{adminInfo.email}</p>
          <p className="text-gray-500 capitalize">Role: {adminInfo.role}</p>
          <p className="text-yellow-500 font-semibold">Badge: {adminInfo.badge}</p>
          <p className="mt-2">{adminInfo.aboutMe}</p>
          <div className="flex space-x-4 mt-2">
            <a href={adminInfo.github} target="_blank" className="text-blue-500 underline">GitHub</a>
            <a href={adminInfo.linkedin} target="_blank" className="text-blue-700 underline">LinkedIn</a>
            <a href={adminInfo.twitter} target="_blank" className="text-blue-400 underline">Twitter</a>
          </div>
        </div>
      </div>

      {/* Line Chart for Overview */}
      <h2 className="text-xl font-bold text-center">Site Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      {/* Pie Chart */}
      <h2 className="text-xl font-bold text-center">Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminDashboard;
