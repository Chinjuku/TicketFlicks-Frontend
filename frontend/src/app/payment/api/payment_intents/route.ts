// pages/api/payment_intents.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe-secret';

export async function POST(req: NextRequest, res: NextResponse) {
    // return NextResponse.json({ hello : "world" }, { status: 200 });
    const data = await req.json();
    const amount = data.amount;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "THB",
        amount: amount * 100,
        automatic_payment_methods: { enabled: true },
      });

      return NextResponse.json({ id: paymentIntent.id, clientSecret: paymentIntent.client_secret });
    } catch (error) {
      return NextResponse.json({ error: "error" });
    }
};