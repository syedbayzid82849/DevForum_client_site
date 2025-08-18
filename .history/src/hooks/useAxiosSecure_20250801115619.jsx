import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: `https://pawfect-server-smoky.vercel.app`,
});

const useAxiosSecure = () => {
    const { user } = useContext(AuthContext);

    axiosSecure.interceptors.request.use(
        (config) => {
            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return config; // config return na korar karon a onek somoy lagsay 
        },
        (error) => Promise.reject(error)
    );


    return axiosSecure;
};

export default useAxiosSecure;
