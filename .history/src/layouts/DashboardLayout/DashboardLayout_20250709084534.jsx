import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useUserRole from '../hooks/useUserRole';
import { FaHome, FaPaw, FaUserEdit, FaPlusCircle, FaHeart, FaUsers, FaUserShield, FaFlag, FaChartPie } from 'react-icons/fa';
import Logo from '../components/shared/Logo';

const DashboardLayout = () => {
    const { role, roleLoading } = useUserRole();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Mobile Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 className="inline-block w-6 h-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"/>
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
                    {/* Sidebar content */}
                    <Logo />

                    {/* Common User Links */}
                    <li>
                        <NavLink to="/dashboard">
                            <FaHome className="inline-block mr-2" /> Dashboard Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/add-pet">
                            <FaPlusCircle className="inline-block mr-2" /> Add Pet
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manage-my-pets">
                            <FaPaw className="inline-block mr-2" /> Manage My Pets
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-follows">
                            <FaHeart className="inline-block mr-2" /> My Follows
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile">
                            <FaUserEdit className="inline-block mr-2" /> My Profile
                        </NavLink>
                    </li>

                    {/* Admin-only Links */}
                    {!roleLoading && role === 'admin' && (
                        <>
                            <div className="divider">Admin Panel</div>
                            <li>
                                <NavLink to="/dashboard/admin-profile">
                                    <FaChartPie className="inline-block mr-2" /> Admin Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-users">
                                    <FaUsers className="inline-block mr-2" /> Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/reported-pets">
                                    <FaFlag className="inline-block mr-2" /> Reported Pets
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/make-admin">
                                    <FaUserShield className="inline-block mr-2" /> Make Admin
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
