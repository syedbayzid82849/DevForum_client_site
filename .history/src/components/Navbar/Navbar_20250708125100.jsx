import { Link, NavLink } from "react-router-dom";
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
    const user = dummyUser; // Replace later with context
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
        <div className="bg-base-100 w-full shadow-md border-b">
            <div className="navbar max-w-7xl mx-auto px-4">
                {/* Start (Mobile menu) */}
                <div className="navbar-start lg:w-1/3">
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
                </div>

                {/* Center Logo */}
                <div className="navbar-center lg:navbar-start">
                    <Link to="/" className="ml-2">
                        <span className="text-2xl md:text-3xl font-semibold italic underline decoration-wavy decoration-indigo-500">
                            pawfect
                        </span>
                    </Link>
                </div>

                {/* Nav menu for large screen */}
                <div className="navbar-center hidden lg:flex lg:w-1/3 justify-center">
                    <ul className="menu menu-horizontal px-1 space-x-2">{navItems}</ul>
                </div>

                {/* User avatar on right */}
                <div className="navbar-end lg:w-1/3 justify-end">
                    {user && (
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
