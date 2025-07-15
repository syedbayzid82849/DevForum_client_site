// PaymentForm.jsx
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);

    const amountInCents = amount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        // Step 1: Create payment method
        const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
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
        const res = await axiosSecure.post('/create-payment-intent', { price: amount });

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
        <div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto border border-yellow-200">
                <h2 className="text-2xl font-bold text-center text-yellow-600">Become a Gold Member</h2>
                <p className="text-center text-gray-500">Pay ${amount} to unlock all features</p>

                <div className="p-4 border-2 border-yellow-300 rounded-lg bg-yellow-50">
                    <CardElement
                        className="py-2 px-3 bg-white rounded-md"
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
                    type="submit"
                    disabled={!stripe || processing}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                >
                    {processing ? 'Processing...' : `Pay $${amount}`}
                </button>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;
