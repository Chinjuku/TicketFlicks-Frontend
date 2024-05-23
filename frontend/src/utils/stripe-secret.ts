import Stripe from 'stripe';
import { loadStripe } from "@stripe/stripe-js";
import { StripeApperance } from '@/types/payment';

export const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
  typescript: true,
});

export const appearance: StripeApperance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#ffffff', // primary color as white
    },
    rules: {
      '.Label': {
        color: '#ffffff', // label text color
      },
      '.Error': {
        color: '#ff0000', // error text color (optional)
      },
    },
  };