
import mongoose from "mongoose"
import express from  'express'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({})
const app=express();
const PORT=process.env.PORT;
await mongoose.connect(process.env.MONGODB)
.then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.listen(PORT||8000,()=>{
    console.log(`Server is running on ${PORT}`);
    
})