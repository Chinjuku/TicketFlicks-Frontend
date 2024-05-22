import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );
export const appearance = {
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