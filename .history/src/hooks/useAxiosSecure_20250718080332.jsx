
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`, 
    w
});

const useAxiosSecure = () => {

    return axiosSecure;
};

export default useAxiosSecure;