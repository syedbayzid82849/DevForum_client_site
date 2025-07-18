import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
});

const useAxiosSecure = () => {
    
    
    return axiosSecure;
    const { user } = useContext(AuthContext);
    console.log(user);
};

export default useAxiosSecure;