// src/components/PaymentForm/PaymentForm.jsx
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState('');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.post("/create-payment-intent", { price: amount })
            .then(res => {
                if (res.data?.clientSecret) {
                    setClientSecret(res.data.clientSecret);
                } else {
                    toast.error("Failed to initialize payment");
                }
            });
    }, [amount, ]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (methodError) {
            toast.error(methodError.message);
            return;
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user?.name || 'Anonymous',
                    email: user?.email || 'unknown@example.com',
                },
            },
        });

        if (confirmError) {
            toast.error(confirmError.message);
            return;
        }

        if (paymentIntent && paymentIntent.status === "succeeded") {
            await axiosSecure.put(`/users/badge/${user.email}`);
            toast.success("🎉 You are now a Gold member!");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-yellow-200"
        >
            <h2 className="text-3xl font-bold text-yellow-600 text-center">Become a Gold Member</h2>
            <p className="text-center text-gray-500">Pay ${amount} to unlock unlimited features</p>

            <div className="p-4 border-2 border-yellow-300 rounded-lg shadow-sm bg-yellow-50">
                <CardElement
                    className="py-2 px-3 bg-white rounded-md text-gray-700"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>

            <button
                disabled={!stripe}
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-all duration-200"
            >
                Pay ${amount}
            </button>
        </form>
    );
};

export default PaymentForm;
