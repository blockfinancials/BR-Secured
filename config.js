export const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://blockchain-backend-puce.vercel.app/api'
  : 'http://localhost:3000/api';
