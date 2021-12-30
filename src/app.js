import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config';
import router from './config/router/index';

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const dbURL = process.env.SHOPPING_CART_DEV_DB_URL;

router(app);

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

router(app);
export default app;
