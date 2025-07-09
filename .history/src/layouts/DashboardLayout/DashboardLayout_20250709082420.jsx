import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ProFastLogo from '../pages/shared/ProFastLogo/ProFastLogo';
import {
    FaHome, FaBoxOpen, FaMoneyCheckAlt, FaUserEdit, FaSearchLocation,
    FaUserCheck, FaUserClock, FaUserShield, FaMotorcycle, FaTasks,
    FaCheckCircle, FaWallet
} from 'react-icons/fa';
import useUserRole from '../hooks/useUserRole';

const DashboardLayout = () => {
    const { role, roleLoading } = useUserRole();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar for Mobile */}
                <div className="navbar bg-base-300 lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 text-xl font-semibold">Dashboard</div>
                </div>

                {/* Main Content */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 w-80 min-h-full p-4 text-base-content space-y-1">
                    {/* Logo */}
                    <ProFastLogo />

                    {/* Common for all users */}
                    <li>
                        <NavLink to="/dashboard">
                            <FaHome className="mr-2" /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myParcels">
                            <FaBoxOpen className="mr-2" /> My Parcels
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/paymentHistory">
                            <FaMoneyCheckAlt className="mr-2" /> Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/track">
                            <FaSearchLocation className="mr-2" /> Track a Package
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile">
                            <FaUserEdit className="mr-2" /> Update Profile
                        </NavLink>
                    </li>

                    {/* Rider-only Links */}
                    {!roleLoading && role === 'rider' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/pending-deliveries">
                                    <FaTasks className="mr-2" /> Pending Deliveries
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/completed-deliveries">
                                    <FaCheckCircle className="mr-2" /> Completed Deliveries
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/my-earnings">
                                    <FaWallet className="mr-2" /> My Earnings
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Admin-only Links */}
                    {!roleLoading && role === 'admin' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/assign-rider">
                                    <FaMotorcycle className="mr-2" /> Assign Rider
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/active-riders">
                                    <FaUserCheck className="mr-2" /> Active Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/pending-riders">
                                    <FaUserClock className="mr-2" /> Pending Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/makeAdmin">
                                    <FaUserShield className="mr-2" /> Make Admin
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
