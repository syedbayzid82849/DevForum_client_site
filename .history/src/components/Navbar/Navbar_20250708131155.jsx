import { Link, NavLink } from "react-router";
import { FaBell, FaBars } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

// Dummy user for now (replace with real auth later)
const dummyUser = {
    displayName: "Bayzid",
    photoURL: "https://i.ibb.co/ZmFy3mD/avatar.png",
    email: "bayzid@example.com",
};

const Navbar = () => {
    const user = false; // Replace later with context
    const logOut = () => alert("Logout clicked"); // Replace later with actual logout

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
                        <button onClick={logOut} className="font-medium flex items-center gap-1">
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
        <div className="bg-base-100 w-full shadow-md  border-b">
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
                                    className="rounded-full w-10 h-10"
                                />
                            </div>
                            <ul
                                tabIndex={0}
                                className="mt-3 z-[50] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <p className="text-sm text-center font-semibold">
                                        {user.displayName}
                                    </p>
                                </li>
                                <li>
                                    <Link to="/dashboard">
                                        <MdDashboard />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={logOut}>
                                        <FiLogOut />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        // Not logged in: show Join Us button
                        <NavLink to="/join-us" className="btn btn-outline btn-primary ml-6">
                            Join Us
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
