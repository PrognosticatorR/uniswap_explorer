import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { authRouter } from './routes/auth.js';
import { userRouter } from './routes/users.js';
import { web3Router } from './routes/web3.js';
import logger from './utils/logger.js';
dotenv.config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('combined', { stream: logger.stream }));
app.use(helmet());
app.use(cors());

app.use('/api/', web3Router);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

export default app;
