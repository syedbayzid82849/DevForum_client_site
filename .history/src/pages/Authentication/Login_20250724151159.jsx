import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import {  NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginUserWithEP } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        loginUserWithEP(data.email, data.password)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: 'Welcome back!', res,
                    timer: 2000,
                    showConfirmButton: false
                }); navigate('/');
            })
            .catch((err) => {
                console.error("Error logging in:", err);
            });
    };

    return (
        <div className="flex flex-col max-w-md mx-auto items-center p-6 rounded-md sm:p-10">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Login</h1>
                <p className="text-sm text-gray-600">Login to access your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 w-full">
                <div className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="leroy@jenkins.com"
                            className="w-full px-3 py-2 border rounded-md border-gray-300"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password Field with toggle */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <a href="#" className="text-xs hover:underline text-gray-600">Forgot password?</a>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="*****"
                                className="w-full px-3 py-2 border rounded-md border-gray-300 pr-10"
                                {...register("password", { required: "Password is required" })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="space-y-2">
                    <div>
                        <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-blue-600 text-white">
                            Login
                        </button>
                    </div>
                    <p className="px-6 text-sm text-center text-gray-600">Don't have an account yet?
                        <NavLink to="/register"><span className="hover:underline text-blue-600"> Sign up</span></NavLink>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
