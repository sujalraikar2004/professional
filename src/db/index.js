import mongoose from "mongoose";
import 'dotenv/config'

import { dbconnect } from "../constants.js";

const connectdb=async()=>{
    try {
      const connectioninstance=  await mongoose.connect(`${process.env.MONGODB_URI}/${dbconnect}`)
      console.log(`\nmongodb connected ${connectioninstance}`)
    } catch (error) {
        console.log("Error:",error)
        process.exit(1)
    }
}

export default connectdb