import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`,
    withCredentials: true
});

const useAxiosSecure = () => {
    cosnt 

        axiosSecure.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${user.accessToken}`
            return config;
        }, error => {
            return Promise.reject(error);
        })
    return axiosSecure;
};

export default useAxiosSecure;
// import axios from 'axios';
// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router';
// import { AuthContext } from '../context/AuthContext';

// const axiosSecure = axios.create({
//     baseURL: `http://localhost:3000`
// });

// const useAxiosSecure = () => {
//     const { user, logOut } = useContext(AuthContext);
//     const navigate = useNavigate();

//     axiosSecure.interceptors.request.use(config => {
//         config.headers.Authorization = `Bearer ${user.accessToken}`
//         return config;
//     }, error => {
//         return Promise.reject(error);
//     })

//     axiosSecure.interceptors.response.use(res => {
//         return res;
//     }, error => {
//         const status = error.status;
//         if (status === 403) {
//             navigate('/forbidden');
//         }
//         else if (status === 401) {
//             logOut()
//                 .then(() => {
//                     navigate('/login')
//                 })
//                 .catch(() => { })
//         }

//         return Promise.reject(error);
//     })


//     return axiosSecure;
// };

// export default useAxiosSecure;