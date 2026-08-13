// require('dotenv').config({path: './env'})

import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express"
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: './env'
})

connectDB();

// async function connectDB(){

// }
// const app = express();


// (async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

//         app.on("ERROR", (error)=>{
//             console.log("ERRR: ", error);
//             throw error;
//         })

//         app.listen(process.env.PORT, ()=>{
//             console.log(`App is listening on ${process.env.PORT}`);
//         })
//     }
//     catch(error){
//         console.log("Error: ", error);
//         throw error;
//     }
// })()