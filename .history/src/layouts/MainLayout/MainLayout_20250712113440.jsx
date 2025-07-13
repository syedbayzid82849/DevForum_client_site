import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className=" mx-auto flex flex-col max-w-7xl min-h-screen">
            <Navbar />

            <main className="flex-1">
                <Outlet />
            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default MainLayout;