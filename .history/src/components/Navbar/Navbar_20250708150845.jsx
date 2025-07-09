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
            {user && (
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
            )}
            <li>
                <button className="btn btn-ghost text-xl">
                    <FaBell />
                </button>
            </li>
        </>
    );

    return (

    );
};

export default Navbar;
