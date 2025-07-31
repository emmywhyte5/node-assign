import e from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = e();
const port = process.env.PORT || 3500 ;
const MONGODB_URI = process.env.MONGODB_URI
import authorRoute from "./route/authorRoute.js";
import userRoute from "./route/userRoute.js";
import bookRoute from "./route/bookRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";



mongoose.connect(MONGODB_URI)
    .then(()=>console.log("Mongodb connected successfully")) 
    .catch((err)=>console.log("Mongodb connection failed",err))


app.use(cookieParser());
app.use(e.json());
app.use(e.urlencoded({extended:true}));


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/author", authorRoute);

app.use("/user", userRoute);

app.use("/book", bookRoute);

app.listen(port,()=>{
    console.log(`server is runninng on port : ${port}`)
    // console.log("server is running on port " + port)
})

