import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({
    limit:"16kb",
}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from "./routes/user.routes.js"


app.use("/api/v1/users", userRouter)
// app.get("/api/v1/users",(req, res)=>{
//     res.json({
//         name: "connetced"
//     })
// })

/*
ERROR HANDLING MIDDLEWARE https://chatgpt.com/share/6a8718a8-ebd4-83e8-ab1c-cb55ab905040

NOTE: 
1. Must be placed after the routes, since express only moves forward in chaining
2. Triggered when next(error), we pass an error to the next()
3. We don't need this in this app, because we are handling errors manually using a wrapper asyncHandler() and "TRY" and "CATCH" block

One subtle thing
4. Don't think Express determines this by literally checking: "Does this function have 4 parameters?"
5. Internally, Express identifies error-handling middleware by the function's declared arity (fn.length === 4), which is why the conventional signature matters.

So remember:

1.  (req, res, next)
            ↓
    NORMAL middleware

2.  (err, req, res, next)
            ↓
    ERROR middleware


<<
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message
    });
});
>>   
*/

export {app};