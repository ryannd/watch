import express from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth';

const app = express();
const port = 3001;

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }),
);

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
