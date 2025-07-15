import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import Payment from '../Payment/Payment';

const Membership = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPayment, setShowPayment] = useState(false);
    const [amount, setAmount] = useState(null); // $9.99 পাঠানোর জন্য

    const handleSignupForFreeBtn = () => {
        if (user) {
            navigate('/');
            toast.success("You already have an account!");
        } else {
            navigate('/login');
        }
    };

    const handleBecomeMemberBtn = () => {
        if (!user) {
            navigate('/login');
            toast.error("Please login first to become a member");
            return;
        }

        // SweetAlert2 confirm
        Swal .fire({
            title: 'Become a Premium Member?',
            text: "You'll be redirected to payment.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#10B981', // emerald-500
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, proceed!'
        }).then((result) => {
            if (result.isConfirmed) {
                setAmount(9.99);
                setShowPayment(true);
                Swal.fire({
                    title: 'Redirecting...',
                    text: 'Please wait while we prepare payment...',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    return (
        <div className="mx-auto">
            <div>
                <h2 className="text-3xl font-bold text-center mt-12 sm:text-5xl ">Pricing</h2>
                <p className="max-w-3xl mx-auto mt-4 text-xl text-center ">
                    Get started on our free plan and upgrade when you are ready.
                </p>
            </div>

            <div className="mt-5 p-7 container mx-auto space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
                {/* Free Plan */}
                <div className="relative p-8 border border-gray-200 rounded-2xl shadow-sm flex justify-end flex-col">
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold">Free</h3>
                        <p className="mt-4 flex items-baseline">
                            <span className="text-5xl font-extrabold tracking-tight">$0</span>
                            <span className="ml-1 text-xl font-semibold">/month</span>
                        </p>
                        <p className="mt-6">You just want to discover</p>
                        <ul role="list" className="mt-6 space-y-6">
                            <li className="flex">✅ <span className="ml-3">Highest can 5 posts</span></li>
                            <li className="flex">✅ <span className="ml-3">Generate video (2 credits)</span></li>
                            <li className="flex">✅ <span className="ml-3">Quizz (1 credits)</span></li>
                        </ul>
                    </div>
                    <button
                        onClick={handleSignupForFreeBtn}
                        type="button"
                        className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 w-full py-3 mt-4 px-6 border border-transparent rounded-md text-center font-medium"
                    >
                        Signup for free
                    </button>
                </div>

                {/* Premium Plan */}
                <div className="relative p-8 border-2 border-yellow-300 rounded-2xl shadow-md flex justify-end flex-col bg-yellow-50">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-yellow-800">Premium</h3>
                        <p className="mt-4 flex items-baseline">
                            <span className="text-5xl font-extrabold tracking-tight text-yellow-700">$9.99</span>
                            <span className="ml-1 text-xl font-semibold text-yellow-600">/month</span>
                        </p>
                        <p className="mt-6 text-yellow-700">For serious members who want unlimited access</p>
                        <ul role="list" className="mt-6 space-y-4 text-yellow-800">
                            <li className="flex items-start">✅ <span className="ml-3">Unlimited Posts</span></li>
                            <li className="flex items-start">✅ <span className="ml-3">Generate Video (Unlimited Credits)</span></li>
                            <li className="flex items-start">✅ <span className="ml-3">Quizzes (Unlimited Access)</span></li>
                            <li className="flex items-start">✅ <span className="ml-3">Priority Support</span></li>
                            <li className="flex items-start">✅ <span className="ml-3">Special Badge (Gold)</span></li>
                        </ul>
                    </div>
                    <button
                        onClick={handleBecomeMemberBtn}
                        type="button"
                        className="bg-[#1f1f1f] hover:bg-white hover:text-black w-full py-3 px-6 border border-transparent rounded-md text-center font-medium mt-4"
                    >
                        Become a Member
                    </button>
                </div>
            </div>

            {/* Show Payment component conditionally */}
            {showPayment && <Payment amount={amount} />}
        </div>
    );
};

export default Membership;
