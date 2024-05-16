import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import orderRouter from './routes/user.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', router);
app.use('/', orderRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
