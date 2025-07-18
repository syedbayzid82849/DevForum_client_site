// src/hooks/useUserRole.js
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

const useUserRole = () => {
    const { user, loading: authLoading } = useContext();
    const axiosSecure = useAxiosSecure();

    const { data: role = 'user', isLoading: roleLoading, refetch } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data.role;
        },
    });

    return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useUserRole;
