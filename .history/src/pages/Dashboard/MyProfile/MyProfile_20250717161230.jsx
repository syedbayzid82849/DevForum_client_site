import React from 'react';
import AdminProfile from './AdminProfile';
import useUserRole from '../../../hooks/useUserRole';
import UserProfile from './UserProfile';

const MyProfile = () => {
    const {role, roleLoading} = useUserRole();
    console.log(role, roleLoading);
    return (
        <>
        {role == 'admin' ? <AdminProfile></AdminProfile> : <UserProfile}
            
        </>
    );
};

export default MyProfile;