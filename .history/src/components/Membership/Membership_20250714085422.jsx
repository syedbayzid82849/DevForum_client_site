import React from 'react';

const Membership = () => {
    const {user } = 
    return (
        <div class="mx-auto">
            <div>
                <h2 class="text-3xl font-bold text-center mt-12 sm:text-5xl ">Pricing</h2>
                <p class="max-w-3xl mx-auto mt-4 text-xl text-center ">Get started on our free plan and upgrade when you are
                    ready.</p>
            </div>
            <div class="mt-5 p-7 container mx-auto space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
                <div class="relative p-8  border border-gray-200 rounded-2xl shadow-sm flex justify-end flex-col">
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold ">Free</h3>
                        <p class="mt-4 flex items-baseline ">
                            <span class="text-5xl font-extrabold tracking-tight">$0</span><span class="ml-1 text-xl font-semibold">/month</span>
                        </p>
                        <p class="mt-6 ">You just want to discover</p>
                        <ul role="list" class="mt-6 space-y-6">
                            <li class="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span class="ml-3 ">Highest can 5 posts </span></li>
                            <li class="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span class="ml-3 ">Generate video (2 credits)</span></li>
                            <li class="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span class="ml-3 ">Quizz (1 credits) </span></li>
                        </ul>
                    </div>
                    <a
                        class="bg-emerald-50 text-emerald-700 hover:bg-emerald-100  block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
                        href="/login">Signup for free
                    </a>
                </div>
                <div class="relative p-8 border-2 border-yellow-300 rounded-2xl shadow-md flex justify-end flex-col bg-yellow-50">
                    <div class="flex-1">
                        <h3 class="text-xl font-bold text-yellow-800">Premium</h3>
                        <p class="mt-4 flex items-baseline">
                            <span class="text-5xl font-extrabold tracking-tight text-yellow-700">$9.99</span>
                            <span class="ml-1 text-xl font-semibold text-yellow-600">/month</span>
                        </p>
                        <p class="mt-6 text-yellow-700">For serious members who want unlimited access</p>
                        <ul role="list" class="mt-6 space-y-4 text-yellow-800">
                            <li class="flex items-start">
                                ✅ <span class="ml-3">Unlimited Posts</span>
                            </li>
                            <li class="flex items-start">
                                ✅ <span class="ml-3">Generate Video (Unlimited Credits)</span>
                            </li>
                            <li class="flex items-start">
                                ✅ <span class="ml-3">Quizzes (Unlimited Access)</span>
                            </li>
                            <li class="flex items-start">
                                ✅ <span class="ml-3">Priority Support</span>
                            </li>
                            <li class="flex items-start">
                                ✅ <span class="ml-3">Special Badge (Gold)</span>
                            </li>
                        </ul>
                    </div>
                    <a href="/membership" class="bg-yellow-600 text-white hover:bg-yellow-700 block w-full py-3 px-6 mt-6 rounded-md text-center font-semibold">
                        Become a Member
                    </a>
                </div>

            </div>

        </div>
    );
};

export default Membership;