import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AdminRoute = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    return (
        <div>

        </div>
    );
};

export default AdminRoute;