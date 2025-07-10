import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Register = () => {
    const { createUserWithEP, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const onSubmit = (data) => {
        console.log("Registration Data:", data);

        createUserWithEP(data.email, data.password)
            .then(() => {
                updateUserProfile(data.name)
                    .then(() => {
                        console.log("User profile updated!");

                        // ✅ Save to MongoDB using axiosSecure
                        const saveUser = {
                            name: data.name,
                            email: data.email,
                            role: "user",
                            badge: "Bronze"
                        };
                        console.log('User data to save:', saveUser);

                        axiosSecure.post("http://localhost:3000/users", saveUser)
                            .then(res => {
                                console.log("User saved to DB:", res.data);
                                toast.success('Registration successful!');
                                navigate('/');
                            })
                            .catch(dbError => {
                                console.error("Error saving to DB:", dbError);
                                toast.error("User created, but failed to save in DB.");
                                navigate('/');
                            });

                    })
                    .catch((profileError) => {
                        console.error("Profile update error:", profileError);
                        toast.error('Registration done, but name update failed.');
                        navigate('/');
                    });
            })
            .catch((error) => {
                console.error("Registration error:", error);
                toast.error("Error registering user.");
            });
    };


    return (
        <div className="flex flex-col max-w-md p-6 rounded-md px-5">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Sign up</h1>
                <p className="text-sm text-gray-600">Create your new account</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                <div className="space-y-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="John Doe"
                            className="w-full px-3 py-2 border rounded-md border-gray-300  "
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            className="w-full px-3 py-2 border rounded-md border-gray-300  "
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter password"
                                className="w-full px-3 py-2 border rounded-md border-gray-300   pr-10"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="Confirm password"
                                className="w-full px-3 py-2 border rounded-md border-gray-300   pr-10"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === password || "Passwords do not match"
                                })}
                            />
                            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
                                {showConfirm ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="space-y-2">
                    <div>
                        <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-blue-600 text-white">
                            Sign up
                        </button>
                    </div>
                    <p className="px-6 text-sm text-center text-gray-600">
                        Already have an account?
                        <a href="/login" className="hover:underline text-blue-600"> Sign in</a>.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
