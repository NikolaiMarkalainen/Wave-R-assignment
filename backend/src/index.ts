import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { registerRoutes } from './routes/routes.js';
import { errorMiddleWare } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [process.env.FRONT, 'http:localhost:5000', process.env.SELF, process.env.REMOTE].filter(
      Boolean
    ) as string[],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(express.json());
const PORT = process.env.PORT || 5000;

registerRoutes(app);
app.use(errorMiddleWare);
app.listen(Number(PORT), '0.0.0.0', () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
