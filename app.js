import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import expressConfig from './src/config/express';
import { db } from './src/config/db';

const app = express();
const PORT = process.env.PORT || 5000;

expressConfig(app);

mongoose.connect(db,
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
