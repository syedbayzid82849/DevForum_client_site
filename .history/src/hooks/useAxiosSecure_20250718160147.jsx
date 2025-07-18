import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`,
});

const useAxiosSecure = () => {
    const { user } = useContext(AuthContext);

    console.log(user?.accessToken);
    axiosSecure.interceptors.request.use(
        (config) => {
            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return config; // config re
        },
        (error) => Promise.reject(error)
    );


    return axiosSecure;
};

export default useAxiosSecure;
