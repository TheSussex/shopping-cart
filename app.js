import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import expressConfig from './src/config/express';

const app = express();
const PORT = 5000;

const dbURL = process.env.SHOPPING_CART_DEV_DB_URL;

expressConfig(app);

mongoose.connect(dbURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Mongodb'))
  .catch((err) => console.log('Could not connect to Mongodb...', err));

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

export default app;
