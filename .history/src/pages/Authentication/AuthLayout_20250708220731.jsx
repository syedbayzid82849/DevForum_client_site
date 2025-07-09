
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md p-6 rounded-md sm:p-10 border border-gray-200 bg-white dark:bg-gray-800 dark:text-gray-100 shadow-md">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
