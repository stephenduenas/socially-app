import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middlewares/ErrorHandler';

const app = express();

// cors
app.use(
  '/',
  cors({
    origin: true, // NOTE: Allowing all origins for now
    optionsSuccessStatus: 200,
    preflightContinue: false,
    methods: 'GET,POST,OPTIONS',
    credentials: true,
  })
);

// middlewares
app.use(express.json());

// routes
app.use(routes);

app.use(errorHandler);

export default app;
