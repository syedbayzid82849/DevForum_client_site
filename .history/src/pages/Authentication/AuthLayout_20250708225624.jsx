import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center  dark:bg-gray-900">
            <div className="w-full max-w-md px- rounded-md  border border-gray-200 bg-white dark:bg-gray-800 dark:text-gray-100 shadow-md">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
