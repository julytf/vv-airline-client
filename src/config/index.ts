export default {
  baseAPIURL: 'http://localhost:3000/api/',
  stripe: {
    publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  },
}
