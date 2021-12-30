import 'dotenv/config';

const {
  SHOPPING_CART_DEV_DB_URL,
  AUTHENTICATION_SECRET,
} = process.env;

export default {
  NODE_ENV: 'development',
  SHOPPING_CART_DEV_DB_URL,
  AUTHENTICATION_SECRET,
};
