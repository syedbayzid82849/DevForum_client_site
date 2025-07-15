// PaymentForm.jsx
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const amountInCents = amount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        // Step 1: Create payment method
        const { error: methodError } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (methodError) {
            setError(methodError.message);
            return;
        } else {
            setError('');
        }

        // Step 2: Create payment intent from server
        setProcessing(true);
        const res = await axiosSecure.post('/create-payment-intent', { price: amountInCents });
        const clientSecret = res?.data?.clientSecret;
        if (!clientSecret) {
            toast.error("Failed to initialize payment");
            setProcessing(false);
            return;
        }

        // Step 3: Confirm payment
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.name || 'Anonymous',
                    email: user?.email || 'unknown@example.com'
                }
            }
        });

        if (confirmError) {
            setError(confirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            // Optional: Save to DB if needed
            const transactionId = paymentIntent.id;

            await axiosSecure.put(`/users/badge/${user.email}`);

            await Swal.fire({
                icon: 'success',
                title: 'Payment Successful!',
                html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                confirmButtonText: 'Awesome!',
            });

            toast.success("🎉 You are now a Gold member!");
            navigate('/dashboard/profile'); // Or any route
        }

        setProcessing(false);
    };

    return (
        <div className=" w-3xl">
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

        </div>
    );
};

export default PaymentForm;
