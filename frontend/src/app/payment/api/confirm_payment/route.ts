import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe-secret';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const paymentIntentId = data.paymentIntentId;

    if (!paymentIntentId) {
        return NextResponse.json({ error: 'Missing paymentIntentId' });
    }

    try {
        // const paymentMethod = await stripe.paymentMethods.create({
        //     type: 'card',
        //     card: {
        //         number: '4242424242424242',
        //         exp_month: 8,
        //         exp_year: 2026,
        //         cvc: '314',
        //     },
        // });
        const paymentIntent = await stripe.paymentIntents.confirm(
            paymentIntentId,
            {
                payment_method: "pm_card_visa",
                return_url: `http://localhost:3000/result`,
            }
        );

        return NextResponse.json(paymentIntent);
    } catch (error) {
        return NextResponse.json({ error: "error.message" });
    }
}

