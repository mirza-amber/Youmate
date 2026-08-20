import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express"
import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config({
    path: './.env'
})

connectDB().then(
    ()=>{
        app.on("error",(er)=>{
            console.log("Error @ on: ", er)
        })
        app.listen(process.env.PORT || 8000, ()=>{
            console.log("Server is running @ port: ", process.env.PORT)
        })
    }
).catch(
    (err)=>{
        console.log("Error @ db connect : ", err);
    }
);






// ;async function connectDB(){

// }
// const app = express();


// (async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

//         app.on("error", (error)=>{
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