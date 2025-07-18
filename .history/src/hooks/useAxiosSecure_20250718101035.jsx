import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
});

const useAxiosSecure = () => {

    const { user } = useContext(AuthContext);

    axios.interceptors.request.use( (config)=> {
        return config;
    },  (error) {
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;