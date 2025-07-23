import React, { Children, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import useUserRole from '../hooks/useUserRole';
import { useNavigate } from 'react-router';

const AdminRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const { role, roleLoading } = useUserRole();
    const navigate = useNavigate();

    if (loading || roleLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    if (!user || role !== 'admin') {
        return navigate('/forbi');
    }

    return children;

};

export default AdminRoute;