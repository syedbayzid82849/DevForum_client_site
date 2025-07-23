import React, { Children, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';
import Forbidden from '../pages/Forbidden/Forbidden';

const AdminRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    if (!user || role !== 'admin') {
        return <Forbidden;
    }

    return children;

};

export default AdminRoute;