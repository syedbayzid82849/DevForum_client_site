import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import useUserRole from '../hooks/useUserRole';

const AdminRoute = () => {
    const { user, loading } = useContext(AuthContext);
    const {role , roleLoading} = useUserRole();

    if (loading || rol) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    return (
        <div>

        </div>
    );
};

export default AdminRoute;