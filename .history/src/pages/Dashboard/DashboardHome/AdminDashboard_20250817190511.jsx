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
            <div className="flex items-center space-x-6 bg-gray-900 p-6 rounded-lg shadow-md">
                <img
                    src={import { Link, NavLink } from "react-router";
                    import { FaBell, FaBars } from "react-icons/fa";
                    import { FiLogOut } from "react-icons/fi";
                    import { MdDashboard } from "react-icons/md";
                    import JoinUsModal from "./JoinUsModal";
                    import React, { useContext } from "react";
                    import { AuthContext } from "../../context/AuthContext";
                    import Swal from "sweetalert2";
                    
                    const Navbar = () => {
                        const { user, signOutUser } = useContext(AuthContext);
                        // logout system  
                        const handleLogOut = () => {
                            Swal.fire({
                                title: 'Are you sure you want to logout?',
                                text: "You will be returned to the home page.",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, logout',
                                cancelButtonText: 'Cancel'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    signOutUser()
                                        .then(() => {
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Logged out!',
                                                text: 'You have been successfully logged out.',
                                                timer: 1500,
                                                showConfirmButton: false,
                                            });
                                        })
                                        .catch((error) => {
                                            console.error("Error logging out:", error);
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Logout Failed',
                                                text: error.message,
                                            });
                                        });
                                }
                            });
                        };
                    
                        const navItems = (
                            <>
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            isActive ? "text-primary font-bold border-b" : "font-medium"
                                        }
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/membership"
                                        className={({ isActive }) =>
                                            isActive ? "text-primary font-bold border-b" : "font-medium"
                                        }
                                    >
                                        Membership
                                    </NavLink>
                                </li>
                                {user && (
                                    <li>
                                        <NavLink
                                            to="/dashboard"
                                            className={({ isActive }) =>
                                                isActive ? "text-primary font-bold border-b flex items-center gap-1" : "font-medium flex items-center gap-1"
                                            }
                                        >
                                            <MdDashboard />
                                            Dashboard
                                        </NavLink>
                                    </li>
                                )}
                                <li>
                                    <button className="btn btn-ghost text-xl">
                                        <a href="/announcement">
                                            <FaBell />
                                        </a>
                                    </button>
                                </li>
                            </>
                        );
                    
                        const [isModalOpen, setIsModalOpen] = React.useState(false);
                    
                    
                        return (
                            <>
                                <div className="bg-base-100 w-full mb-2 shadow-md shadow-neutral-500 ">
                                    <div className="navbar max-w-7xl mx-auto ">
                    
                                        {/* Navbar Start */}
                                        <div className="navbar-start flex items-center gap-2">
                                            {/* Hamburger Menu (Mobile only) */}
                                            <div className="dropdown">
                                                <div tabIndex={0} className="btn btn-ghost pl-2 lg:hidden">
                                                    <FaBars className="text-xl" />
                                                </div>
                                                <ul
                                                    tabIndex={0}
                                                    className="menu menu-sm dropdown-content mt-3 z-[50] p-3 shadow bg-base-100 rounded-box w-52 space-y-1"
                                                >
                                                    {navItems}
                                                </ul>
                                            </div>
                    
                                            {/* Logo - large screen only */}
                                            <Link to="/" className="hidden lg:flex justify-center items-center ml-1">
                                                <span className="text-3xl font-semibold italic underline decoration-wavy decoration-indigo-500">
                                                    pawfect
                                                </span>
                                            </Link>
                                        </div>
                    
                                        {/* Logo - small screen only */}
                                        <div className="navbar-center lg:hidden">
                                            <Link to="/" className="ml-2">
                                                <span className="text-3xl font-semibold italic underline decoration-wavy decoration-indigo-500">
                                                    pawfect
                                                </span>
                                            </Link>
                                        </div>
                    
                                        {/* Large screen nav menu */}
                                        <div className="navbar-center hidden lg:flex">
                                            <ul className="menu menu-horizontal px-1 space-x-2">{navItems}</ul>
                                        </div>
                    
                                        {/* Navbar End - Profile Dropdown */}
                                        <div className="navbar-end">
                                            {user ? (
                                                // Logged-in view: show profile dropdown
                                                <div className="dropdown dropdown-end">
                                                    <div tabIndex={0} className="btn btn-circle avatar online">
                                                        <img
                                                            src={user.photoURL || "/src/assets/user-default.jpg"}
                                                            alt="Profile"
                                                            className="rounded-full w-12 border-b"
                                                        />
                                                    </div>
                                                    <ul
                                                        tabIndex={0}
                                                        className="mt-3 z-[50] p-6 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-72  overflow-y-auto space-y-3"
                                                    >
                                                        <li>
                                                            <p className="text-sm text-center font-semibold">
                                                                {user.displayName ? user.displayName : "User Name"}
                                                            </p>
                                                        </li>
                                                        <li>
                                                            <Link to="/dashboard">
                                                                <MdDashboard />
                                                                Dashboard
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <button onClick={() => handleLogOut()} className="flex items-center gap-1">
                                                                <FiLogOut />
                                                                Logout
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            ) : (
                                                // Not logged in: show Join Us button
                                                <button
                                                    onClick={() => setIsModalOpen(true)}
                                                    className="btn btn-outline btn-primary ">
                                                    Join Us
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* Join Us Modal */}
                                {isModalOpen && <JoinUsModal closeModal={() => setIsModalOpen(false)} />}
                            </>
                        );
                    };
                    
                    export default Navbar;
                    }
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
