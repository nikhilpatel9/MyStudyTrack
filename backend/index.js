
import mongoose from "mongoose"
import express from  'express'
import dotenv from 'dotenv'
import path from 'path'
import cookieParser from 'cookie-parser';
import UserRoute from "./routers/user.router.js"
dotenv.config({})
const app=express();
const PORT=process.env.PORT;
app.use(cookieParser())
import cors from 'cors';
await mongoose.connect(process.env.MONGODB)
.then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use('/api/user',UserRoute)
app.listen(PORT||8000,()=>{
    console.log(`Server is running on ${PORT}`);
    
})