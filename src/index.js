import dotenv from 'dotenv'
import connectDB from "../db/index.js";
import express from "express"
import { app } from './app.js';

dotenv.config({
    path:"/.env"
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT,() => {
         console.log("server is listening at",process.env.PORT);
         
    })
})
.catch((err)=>{
    console.log('mongo db connection failed');
    
})

