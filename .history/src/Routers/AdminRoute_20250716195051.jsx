import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const AdminRoute = () => {
    const { user, loading } = useContext(AuthContext);
    const {role , }
    if (loading || ) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    return (
        <div>

        </div>
    );
};

export default AdminRoute;