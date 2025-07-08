import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className="min-h-screen max-w-7xl mx-auto flex flex-col px-4 border">
            <Navbar />

            <main className="flex-1">
                <h1>fdjksfj</h1>
                <Outlet />
            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default MainLayout;