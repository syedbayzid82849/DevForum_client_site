import React, { Children, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';

const AdminRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const { role, roleLoading } = useUserRole();
    const navigate = usena

    if (loading || roleLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    if (!user || role !== 'admin') {
        return < to="/forbidden"/>;
    }

    return children;

};

export default AdminRoute;