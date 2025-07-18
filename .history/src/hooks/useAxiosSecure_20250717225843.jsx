import React, { useContext } from 'react';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: `https://zap-shift-server-psi.vercel.app`
});

const useAxiosSecure = () => {
    const { user, logOut } = useContext(authconte);
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;
        if (status === 403) {
            navigate('/forbidden');
        }
        else if (status === 401) {
            logOut()
                .then(() => {
                    navigate('/login')
                })
                .catch(() => { })
        }

        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;