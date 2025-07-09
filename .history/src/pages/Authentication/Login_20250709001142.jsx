import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginUserWithEmailAndPassword } = useContext(AuthContext);
    const onSubmit = (data) => {
        loginUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
            // User successfully logged in  
    };

    return (
        <div className="flex flex-col max-w-md mx-auto items-center p-6 rounded-md sm:p-10 ">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Login</h1>
                <p className="text-sm dark:text-gray-600">Login to access your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 w-full">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="leroy@jenkins.com"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <a href="#" className="text-xs hover:underline dark:text-gray-600">Forgot password?</a>
                        </div>
                        <input
                            type="password"
                            id="password"
                            placeholder="*****"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <div>
                        <button type="submit" className="w-full px-8 py-3 font-semibold rounded-4xl mb-4 bg-blue-500 text-black ">
                            Login
                        </button>
                    </div>
                    <p className="px-6 text-sm text-center text-gray-600">Don't have an account yet?
                        <NavLink to="/register"><span className="hover:underline text-blue-500"> Sign up</span></NavLink>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
