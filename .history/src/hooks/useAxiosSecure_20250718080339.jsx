
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`, 
    withCredentials: t
});

const useAxiosSecure = () => {

    return axiosSecure;
};

export default useAxiosSecure;