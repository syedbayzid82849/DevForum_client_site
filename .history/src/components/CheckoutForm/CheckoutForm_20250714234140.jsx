import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState('');
    const axiosSecure = useA

    useEffect(() => {
        axios.post("http://localhost:3000/create-payment-intent", { price: 9.99 })
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
            // ✅ Update badge to gold
            await axios.put(`http://localhost:3000/users/badge/${user.email}`);
            toast.success("You are now a Gold member!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <CardElement className="border p-4 rounded-md" />
            <button type="submit" className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded">Pay $9.99</button>
        </form>
    );
};

export default CheckoutForm;
