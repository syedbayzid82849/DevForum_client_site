import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center  dark:bg-gray-900">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
