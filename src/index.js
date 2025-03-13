
import connectdb from "./db/index.js";
import { app } from "./app.js";
import dotenv from "dotenv"
import 'dotenv/config'
dotenv.config({
    path:'./env'
})
connectdb()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running at the port ${process.env.PORT}`);
        
    })
    
})
.catch((err)=>{
    console.log("mongodb connection failed",err);
    
})



