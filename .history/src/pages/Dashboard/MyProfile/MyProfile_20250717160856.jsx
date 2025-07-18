import React from 'react';
import AdminProfile from './AdminProfile';
import useUserRole from '../../../hooks/useUserRole';

const MyProfile = () => {
    const {role, roleLoading} = useUserRole();
    console.log(role, roleLoading);
    return (
        <>
        {role == =}
            <AdminProfile></AdminProfile>
        </>
    );
};

export default MyProfile;