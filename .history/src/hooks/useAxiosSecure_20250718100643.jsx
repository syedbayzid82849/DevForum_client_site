import { useContext } from 'react';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
});

const useAxiosSecure = () => {
    
    const { user } = useContext(AuthContext);
    console.log(user);

    return axiosSecure;
};

export default useAxiosSecure;