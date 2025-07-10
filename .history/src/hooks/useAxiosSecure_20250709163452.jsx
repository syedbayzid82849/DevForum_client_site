import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-\';
import { AuthContext } from '../context/AuthContext';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                if (user?.accessToken) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                const status = error.response?.status;
                if (status === 403) {
                    navigate('/forbidden');
                } else if (status === 401) {
                    logOut()
                        .then(() => navigate('/login'))
                        .catch(() => { });
                }
                return Promise.reject(error);
            }
        );

        // Cleanup: remove interceptor on unmount
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [user?.accessToken, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
