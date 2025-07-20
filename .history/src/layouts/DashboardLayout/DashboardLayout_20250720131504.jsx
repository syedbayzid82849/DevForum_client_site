import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { FaHome, FaPaw, FaUserEdit, FaPlusCircle, FaUsers, FaFlag, FaBullhorn } from 'react-icons/fa';
import useUserRole from '../../hooks/useUserRole';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const DashboardLayout = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    return (
        <div className="drawer lg:drawer-open border max-w-7xl mxau">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Mobile Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                className="inline-block w-6 h-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2">Dashboard</div>
                </div>

                {/* Page content */}
                <Outlet />
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">

                    {/* Logo - large screen only */}
                    <Link to="/" className="hidden  lg:flex justify-center items-center mb-4">
                        <span className="text-3xl font-semibold italic underline decoration-wavy decoration-indigo-500">
                            pawfect
                        </span>
                    </Link>

                    {/* Common User Links */}
                    <li>
                        <NavLink to="/dashboard">
                            <FaHome className="inline-block mr-2" /> Dashboard Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/add-post">
                            <FaPlusCircle className="inline-block mr-2" /> Add Post
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-posts">
                            <FaPaw className="inline-block mr-2" /> My Posts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-profile">
                            <FaUserEdit className="inline-block mr-2" /> My Profile
                        </NavLink>
                    </li>
                    {/* ✅ Admin-Only Links */}
                    {role === "admin" && (
                        <>
                            <li>
                                <NavLink to="/dashboard/manage-users">
                                    <FaUsers className="mr-2" /> Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/reported-commend">
                                    <FaFlag className="mr-2" /> Reported Comments
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/make-announcement">
                                    <FaBullhorn className="mr-2" /> Make Announcement
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
