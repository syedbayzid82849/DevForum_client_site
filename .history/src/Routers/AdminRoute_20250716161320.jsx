import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AdminRoute = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    if (loading) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    return (
        <div>

        </div>
    );
};

export default AdminRoute;