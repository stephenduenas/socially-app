/* app.ts */

// global dependencies
import cors from 'cors';

// project dependencies
import routes from './routes';

// set express app
import express from 'express';
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

export default app;
