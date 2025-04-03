import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './routes/user-routes.js';
import { taskRouter } from './routes/task-routes.js';
import 'dotenv/config'



const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "https://task-manager-frontend-lemon-seven.vercel.app",
  ];
app.use(cors({
    origin: allowedOrigins,
    credentials: true  
}));
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

mongoose.connect(process.env.MONGOURL||"mongodb://localhost:27017/taskmanager").then(() => console.log('MongoDB connected')).catch((error) => console.log(error));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
