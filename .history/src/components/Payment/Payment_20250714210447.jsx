import React from 'react';

const Payment = ({ amount }) => {
    console.log(amo);
    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold text-center">Pay ${amount} to become a Premium Member</h2>
            {/* Stripe বা অন্য কিছু দিয়ে payment form এখানে হবে */}
        </div>
    );
};


export default Payment;