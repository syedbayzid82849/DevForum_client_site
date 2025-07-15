import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState('');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.post("/create-payment-intent", { price: 9.99 })
            .then(res => setClientSecret(res.data.clientSecret));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            toast.error(error.message);
            return;
        }

        const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (paymentIntent.status === "succeeded") {
            await axiosSecure.put(`/users/badge/${user.email}`);
            toast.success("🎉 You are now a Gold member!");
        }
    };

    return (
        <div className=" md:min-h-screen ">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-yellow-200"
            >
                <h2 className="text-3xl font-bold text-yellow-600 text-center">Become a Gold Member</h2>
                <p className="text-center text-gray-500">Pay $9.99 to unlock unlimited features</p>

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
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                >
                    Pay $9.99
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
