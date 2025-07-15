import React from 'react';
import { useLocation } from 'react-router';
import CheckoutForm from '../PaymentForm/PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../PaymentForm/PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
    const location = useLocation();
    const amount = location.state?.amount || 9.99;


    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Complete Payment</h2>
            <Elements stripe={stripePromise}>
                <PaymentForm amount= />
            </Elements>
        </div>
    );
};


export default Payment;