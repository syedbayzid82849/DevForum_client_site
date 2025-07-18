import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`,
});

const useAxiosSecure = () => {
    const { user } = useContext(AuthContext);

    console.log(user?.accessToken);
    const interceptor = axiosSecure.interceptors.request.use(
        (config) => {
            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;
