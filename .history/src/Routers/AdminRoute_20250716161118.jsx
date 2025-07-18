import React from 'react';

const AdminRoute = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    return (
        <div>

        </div>
    );
};

export default AdminRoute;