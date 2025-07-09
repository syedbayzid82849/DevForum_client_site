import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className="flex flex-col max-w-md mx-auto items-center p-6 rounded-md sm:p-10 border border-gray-100 dark:text-gray-800">
            <Outlet />
        </div>
    );
};

export default AuthLayout;