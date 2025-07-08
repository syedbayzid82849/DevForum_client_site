import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { FaBell, FaBars } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logOut();
        } catch (err) {
            console.error(err);
        }
    };

    const navItems = (
        <>
            <li>
                <NavLink to="/" className="font-medium">Home</NavLink>
            </li>
            <li>
                <NavLink to="/membership" className="font-medium">Membership</NavLink>
            </li>
            <li>
                <button className="btn btn-ghost text-xl">
                    <FaBell />
                </button>
            </li>
            {user ? (
                <>
                    <li>
                        <NavLink to="/dashboard" className="font-medium flex items-center gap-1">
                            <MdDashboard />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="font-medium flex items-center gap-1">
                            <FiLogOut />
                            Logout
                        </button>
                    </li>
                </>
            ) : (
                <li>
                    <NavLink to="/join-us" className="btn btn-outline btn-primary">
                        Join Us
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="bg-base-100 shadow-md">
            <div className="navbar max-w-7xl mx-auto px-4">
                {/* Start: logo + drawer btn */}
                <div className="navbar-start">
                    {/* Mobile Dropdown Button */}
                    <div className="dropdown">
                        <div tabIndex={0} className="btn btn-ghost lg:hidden">
                            <FaBars className="text-xl" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[50] p-3 shadow bg-base-100 rounded-box w-52 space-y-1"
                        >
                            {navItems}
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold ml-2">
                        <span className="text-primary">🐾 Pawfect</span>
                    </Link>
                </div>

                {/* Center nav: desktop only */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-2">{navItems}</ul>
                </div>

                {/* End: Profile avatar (for logged in user) */}
                <div className="navbar-end">
                    {user && (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} className="btn btn-circle avatar online">
                                <img
                                    src={user.photoURL || "/default-avatar.png"}
                                    alt="Profile"
                                    className="rounded-full w-10 h-10"
                                />
                            </div>
                            <ul
                                tabIndex={0}
                                className="mt-3 z-[50] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <p className="text-sm text-center font-semibold">
                                        {user.displayName || "User"}
                                    </p>
                                </li>
                                <li>
                                    <Link to="/dashboard">
                                        <MdDashboard />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>
                                        <FiLogOut />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
