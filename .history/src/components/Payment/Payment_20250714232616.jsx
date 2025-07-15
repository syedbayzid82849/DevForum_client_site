import React from 'react';
import { useLocation } from 'react-router';

const Payment = () => {
    const location = useLocation();
    const amount = location.state?.amount || 0;
    console.log(amount);
    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold text-center">Pay ${amount} to become a Premium Member</h2>
            {/* Stripe বা অন্য কিছু দিয়ে payment form এখানে হবে */}
        </div>
    );
};


export default Payment;