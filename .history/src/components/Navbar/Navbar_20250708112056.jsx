import { Link, NavLink } from "react-router";
import { FaBell, FaBars } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
    // const { user, logOut } = useContext(AuthContext);

    const handleLogout = async () => {
        // try {
        //     await logOut();
        // } catch (err) {
        //     console.error(err);
        // }
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
                        <p className="text-sm text-center font-semibold">
                            {user.displayName || "User"}
                        </p>
                    </li>
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
                {/* Left Side */}
                <div className="navbar-start">
                    {/* Mobile Menu Button */}
                    <div className="dropdown">
                        <div tabIndex={0} className="btn btn-ghost lg:hidden">
                            <FaBars className="text-xl" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-52 space-y-1"
                        >
                            {navItems}
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold ml-2">
                        <span className="text-primary">🐾 PetMate</span>
                    </Link>
                </div>

                {/* Center Nav for large screen */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-1">
                        {navItems}
                    </ul>
                </div>

                {/* Right Side */}
                <div className="navbar-end">
                    {!user ? (
                        <NavLink to="/join-us" className="btn btn-outline btn-primary">
                            Join Us
                        </NavLink>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} className="btn btn-circle avatar online">
                                <img
                                    src={user.?`photoURL || "/src/assets/user-default.jpg"}
                                    alt="Profile"
                                    className="rounded-full"
                                />
                            </div>
                            <ul
                                tabIndex={0}
                                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                            >
                                {navItems}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
