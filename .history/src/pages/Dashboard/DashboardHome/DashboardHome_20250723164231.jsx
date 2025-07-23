
import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import UserDashboard from './UserDashboard';
import Forbidden from '../../Forbidden/Forbidden';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import AdminDashboard from './AdminDashboard';

const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();
    console.log(role);

    if (roleLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (role === 'user') {
        return <UserDashboard></UserDashboard>
    }
    else if (role === 'admin') {
        return <AdminDashboard></AdminDashboard>
    }
    else {
        return <Forbidden></Forbidden>
    }

};

export default DashboardHome;
