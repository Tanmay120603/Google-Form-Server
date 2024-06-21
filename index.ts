import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { router as FormRouter } from './routes/form';

config(); 

const server = express();

server.use(cors({ origin: '*' }));
server.use(express.json());
server.use('/api/form', FormRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}`);
});
