import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe-secret';

export async function POST(req: NextRequest) {
  try {
    // const data = await req.json();
    // const amount = data.amount;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1PIsvW2LBrdE2noaKglZ7T2f',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/?success=true`,
      cancel_url: `${req.nextUrl.origin}/?canceled=true`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: err.statusCode || 500 });
  }
}

