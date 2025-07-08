import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div className="min-h-screen max-w-7xl mx-auto flex flex-col border">
            <Navbar />

            <main className="flex-1">
                <h1>fdjksfj</h1>
                {/* <Outlet /> */}
            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default MainLayout;