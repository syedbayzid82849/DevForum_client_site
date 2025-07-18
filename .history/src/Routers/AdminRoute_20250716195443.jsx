import React, { Children, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import useUserRole from '../hooks/useUserRole';

const AdminRoute = () => {
    const { user, loading } = useContext(AuthContext);
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    if (!user || user !== 'Admin') {
        return <Navigate to="/forbidden" state={{ from: location }} />;
    }

    return (
        Children

};

export default AdminRoute;