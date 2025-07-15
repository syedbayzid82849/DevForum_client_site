import React from 'react';
import { useLocation } from 'react-router';

const Payment = () => {
    const location = useLocation();
    const amount = location.state?.amount || 0;
    console.log(amount);
    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Complete Payment</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};


export default Payment;