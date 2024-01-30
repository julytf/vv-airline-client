export default {
  baseAPIURL: 'http://localhost:3000/api/',
  stripe: {
    publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  },
  paypal: {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  },
}