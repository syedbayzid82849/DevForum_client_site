import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const JoinUsModal = ({ closeModal }) => {
    const { userWithGoogle } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        userWithGoogle()
            .then(res => {
                const loggedUser = res.user;
                console.log("Google user:", loggedUser);

                // ✅ Save user to DB
                const saveUser = {
                    name: loggedUser.displayName,
                    email: loggedUser.email,
                    role: "user",
                    badge: "Bronze"
                };

                axiosSecure.post("/users", saveUser)
                    .then(res => {
                        console.log("Google user saved:", res.data);
                        closeModal();
                        navigate("/");
                    })
                    .catch(err => {
                        console.error("DB Save Error:", err);
                        toast.error("Google sign-in successful, but DB save failed.");
                        closeModal();
                        navigate("/");
                    });
            })
            .catch(err => {
                console.error("Google Sign-In Error:", err);
            })
    };

    const handleSignupBtn=()=>{
        return navigate('/register')
    }
    
    return (
        <>
            <div
                className="fixed inset-0 bg-transparent bg-opacity-10 flex justify-center items-center z-50"
                onClick={closeModal}
            >
                <div
                    className="bg-gray-700 rounded-lg p-6 w-96 relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-3 right-3 text-xl font-bold text-white hover:text-red-500 transition duration-200"
                        title="Close"
                    >
                        &times;
                    </button>

                    {/* Sign In / Log In buttons */}
                    <div className="my-6 space-y-4">
                        <button
                            onClick={handleSignupBtn}
                            type="button"
                            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md dark:border-gray-600 focus:ring-2 focus:ring-offset-1 focus:dark:ring-default-600 bg-white text-gray-800 hover:bg-gray-100 transition duration-200"
                        >
                            Sign up
                        </button>
                        <button
                        onClick={()=>handleLoginBtn()}
                            type="button"
                            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md dark:border-gray-600 focus:ring-2 focus:ring-offset-1 focus:dark:ring-default-600 bg-white text-gray-800 hover:bg-gray-100 transition duration-200"
                        >
                            Log In
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center pt-4 space-x-1">
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                        <p className="px-3 text-sm text-white">Login with social accounts</p>
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                    </div>

                    {/* Google Sign In */}
                    <div className="my-6 space-y-4">
                        <button
                            onClick={handleGoogleSignIn}
                            aria-label="Login with Google"
                            type="button"
                            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md dark:border-gray-600 focus:ring-2 focus:ring-offset-1 focus:dark:ring-default-600 bg-white text-gray-800 hover:bg-gray-100 transition duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            <p>Login with Google</p>
                        </button>
                    </div>
                </div>
            </div>


        </>
    );
};

export default JoinUsModal;

