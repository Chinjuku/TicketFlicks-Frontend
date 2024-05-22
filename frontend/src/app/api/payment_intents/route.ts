// pages/api/payment_intents.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  typescript: true,
  apiVersion: '2024-04-10',
});

export async function POST(req: NextRequest, res: NextResponse) {
    // return NextResponse.json({ hello : "world" }, { status: 200 });
    const data = await req.json();
    const amount = data.amount;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "EUR",
        amount: amount,
        automatic_payment_methods: { enabled: true },
      });

      return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      return NextResponse.json({ error: "error" });
    }
};