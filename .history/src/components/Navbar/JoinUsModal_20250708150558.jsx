// JoinUsModal.jsx

import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";

const JoinUsModal = ({ closeModal }) => {


    return (
        <>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={closeModal}
            >
                <div
                    className="bg-white rounded-lg p-6 w-96 relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-3 right-3 text-xl font-bold"
                        title="Close"
                    >
                        &times;
                    </button>

                    <h2 className="text-2xl font-semibold mb-4 text-center">
                        lo
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {!isLogin && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    {...register("name", { required: !isLogin })}
                                    className="input input-bordered w-full"
                                />
                                {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

                                <input
                                    type="text"
                                    placeholder="Photo URL (optional)"
                                    {...register("photo")}
                                    className="input input-bordered w-full"
                                />
                            </>
                        )}

                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", { required: true })}
                            className="input input-bordered w-full"
                        />
                        {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: true })}
                            className="input input-bordered w-full"
                        />
                        {errors.password && <p className="text-red-500 text-sm">Password is required</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full"
                        >
                            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
                        </button>
                    </form>

                    <div className="divider">OR</div>

                    <button
                        onClick={handleGoogle}
                        disabled={loading}
                        className="btn btn-outline w-full flex items-center justify-center gap-2"
                    >
                        <FcGoogle size={24} />
                        Continue with Google
                    </button>

                    <p className="mt-4 text-center">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-600 underline"
                        >
                            {isLogin ? "Register" : "Login"}
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
};

export default JoinUsModal;
