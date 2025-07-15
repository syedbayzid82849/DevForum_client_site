import React from 'react';
import { useLocation } from 'react-router';
import CheckoutForm from '../PaymentForm/PaymentForm';
import { loadStripe } from '@stripe/stripe-js';

const Payment = () => {
    const location = useLocation();
    const amount = location.state?.amount || 0;
    console.log(amount);

    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Complete Payment</h2>
            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
        </div>
    );
};


export default Payment;