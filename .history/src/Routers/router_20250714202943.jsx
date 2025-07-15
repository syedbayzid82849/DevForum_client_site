import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Login from '../pages/Authentication/Login';
import Home from '../pages/HomeLayouts/Home';
import Register from '../pages/Authentication/Register';
import Membership from '../components/Membership/Membership';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout';
import AddPost from '../pages/Dashbard/AddPost/AddPost';
import MyPosts from '../pages/Dashbard/MyPosts/MyPosts';
import MyProfile from '../pages/Dashbard/MyProfile/MyProfile';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/membership",
                element: <PrivateRoute><Membership /></PrivateRoute>,
            }
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>, 
        children: [
            {
                path: "add-post",
                element: <AddPost />,
            },
            {
                path: "my-posts",
                element: <MyPosts />,
            },
            {
                path: "my-profile",
                element: <MyProfile />,
            },
            {
                path:'payment', 
                element: <paymen ,
            }
        ],
    }
]);

export default router;