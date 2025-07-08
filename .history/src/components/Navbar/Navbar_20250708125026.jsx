import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; // Firebase Auth
import toast from 'react-hot-toast'; // Toaster for logout message
import { FaBell } from 'react-icons/fa'; // Notification icon

const Navbar = () => {
  const [user, setUser] = useState(null); // Firebase user object
  const [loading, setLoading] = useState(true); // To handle initial auth state loading
  const auth = getAuth(); // Get Firebase auth instance

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth]);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to logout. Please try again.');
    }
  };

  // Nav items for both logged in and logged out states
  const navLinks = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? 'text-primary font-bold' : ''}>Home</NavLink></li>
      <li><NavLink to="/membership" className={({ isActive }) => isActive ? 'text-primary font-bold' : ''}>Membership</NavLink></li>
      {/* অ্যাসাইনমেন্টে 'All Pets' উল্লেখ আছে, তাই এটিও যোগ করা হলো */}
      <li><NavLink to="/all-pets" className={({ isActive }) => isActive ? 'text-primary font-bold' : ''}>All Pets</NavLink></li>
    </>
  );

  if (loading) {
    // Optionally show a skeleton loader or a spinner while checking auth state
    return (
      <div className="navbar bg-base-100 shadow-md">
        <div className="container mx-auto">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">Loading...</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li className="skeleton h-8 w-16 mx-2"></li>
              <li className="skeleton h-8 w-24 mx-2"></li>
              <li className="skeleton h-8 w-20 mx-2"></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="container mx-auto">
        {/* Mobile menu toggle */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navLinks}
              {!user && ( // Show Join Us button only when not logged in (for mobile)
                <li><NavLink to="/join-us" className={({ isActive }) => isActive ? 'text-primary font-bold' : ''}>Join Us</NavLink></li>
              )}
            </ul>
          </div>
          {/* Logo and website name */}
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            {/* আপনার লোগো এখানে যোগ করুন */}
            <img src="/path/to/your/logo.png" alt="PetHaven Logo" className="h-8 w-8 mr-2" />
            PetHaven
          </Link>
        </div>

        {/* Desktop nav links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navLinks}
          </ul>
        </div>

        {/* Right side - Notification, Join Us / User profile */}
        <div className="navbar-end flex items-center">
          {/* Notification Icon */}
          <button className="btn btn-ghost btn-circle">
            <FaBell className="h-5 w-5" />
          </button>

          {!user ? ( // If user is NOT logged in
            <NavLink to="/join-us" className="btn btn-primary ml-2">
              Join Us
            </NavLink>
          ) : ( // If user IS logged in
            <div className="dropdown dropdown-end ml-2">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || 'https://via.placeholder.com/150'} alt="User Avatar" />
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li><a className="font-bold text-gray-700">{user.displayName || user.email}</a></li> {/* User name (not clickable) */}
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;