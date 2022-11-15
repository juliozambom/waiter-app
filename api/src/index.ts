import path from 'node:path';

import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';

mongoose
  .connect(
    'mongodb+srv://waiterapp:waiter123@cluster0.stx3fq7.mongodb.net/test'
  )
  .then(() => {
    const app = express();
    const PORT = 8080;

    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
    app.use(express.json());
    app.use(router);

    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  })
  .catch(() => console.log('Error connecting to mongo'));
