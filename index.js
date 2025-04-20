import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import routes from './routes/index.js';

dotenv.config();

const app=express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());


//Routes
app.use('/api',routes);

//DB+server
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server running on http://localhost:${PORT}`);
    });
});