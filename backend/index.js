// const express = require('express')// method-1
import express from "express"; // method-2
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path, { dirname } from "path";
import { app,server } from "./socket/socket.js";
dotenv.config({});

const __dirname =  path.resolve() 

 
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    origin:'https://chat-app-owrr.onrender.com',
    credentials:true
};
app.use(cors(corsOption)); 
app.use(express.static(path.join(__dirname,"/frontend/build")))

// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
app.get("*",(_,res)=>{
     res.sendFile(path.resolve(__dirname, "frontend","build","index.html"))
})

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at prot ${PORT}`);
});

