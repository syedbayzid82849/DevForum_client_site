import React, { Children, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';

const AdminRoute = ({Children}) => {
    const { user, loading } = useContext(AuthContext);
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    if (!user || role !== 'Admin') {
        return <Navigate to="/login" />;
    }

    return Children;

};

export default AdminRoute;