import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1">
                {/* <Outlet /> */}
            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default MainLayout;