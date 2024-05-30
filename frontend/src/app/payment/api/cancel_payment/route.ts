import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe-secret';

export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.json()
    const clientSecret: string = data.clientSecret
    try {
        if (!clientSecret) {
            return NextResponse.json({ error: "no client secert" });
        }
        await stripe.paymentIntents.cancel(clientSecret);
        return NextResponse.json({result: "success"})
    } catch (error) {
        NextResponse.json({ result: "error"});
    }
}
