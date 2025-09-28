import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router';
import { Footer } from '../../components/Footer/Footer';

const MainLayout = () => {
    return (
        <div className=" flex flex-col min-h-screen ">
            <Navbar />

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;