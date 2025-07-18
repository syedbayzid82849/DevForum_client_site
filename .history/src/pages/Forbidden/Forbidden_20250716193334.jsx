// src/pages/Shared/Forbidden.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-center px-4">
            <h1 className="text-6xl font-bold text-error mb-4">403</h1>
            <p className="text-xl mb-2">Access Forbidden</p>
            <p className="text-sm mb-6 text-gray-500">You do not have permission to access this page.</p>
            <Link to="/" className="btn btn-primary">Go Back Home</Link>
        </div>
    );
};

export default Forbidden;
