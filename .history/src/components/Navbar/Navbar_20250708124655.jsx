import { Link, NavLink } from "react-router";
import { FaBell, FaBars } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

// Dummy user for now (replace with real auth later)
const dummyUser = {
    displayName: "Bayzid",
    photoURL: "https://i.ibb.co/ZmFy3mD/avatar.png", // you can use any placeholder avatar
    email: "bayzid@example.com",
};

const Navbar = () => {
    const user = dummyUser; // replace later with context value
    const logOut = () => alert("Logout clicked"); // replace later with context logout

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
        <div className="bg-base-100 w-full shadow-bottom-md border">
            <div className="navbar mx-auto ">
                {/* Start: logo + drawer btn */}
                <div className="navbar-start">
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

                    <Link to="/" className="ml-2">
                        <span className="text-3xl font-semibold italic underline decoration-wavy decoration-indigo-500">
                            pawfect
                        </span>
                    </Link>

                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-2">{navItems}</ul>
                </div>

                <div className="navbar-c">
                    {user && (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} className="btn btn-circle avatar online">
                                <img
                                    src={'/src/assets/user-default.jpg'}
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
