
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
});
co
const useAxiosSecure = () => {

    return axiosSecure;
};

export default useAxiosSecure;