import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, // if needed
});

const useAxiosSecure = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            axiosSecure.interceptors.request.use(
                config => {
                    // Token দিলে এখানে সেট করো
                    config.headers.Authorization = `Bearer your_token_if_needed`;
                    return config;
                },
                error => Promise.reject(error)
            );
        }
    }, [user]);

    return axiosSecure;
};

export default useAxiosSecure;
