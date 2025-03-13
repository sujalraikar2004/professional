import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    
    },
    fullname:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
    },
    avatar:{
        type:String,
        required:true,

    },
    coverInage:{
        type:String,
        required:true,  
    },
    watchhistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video",

    }],
    password:{
        type:String,
        required:[true,"password is required"],
        
    },
    refreshtoken:{
        type:String,
        
    }

},{timestamps:true});
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,12);
    next()
}
)
userSchema.methods.isPassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.getAccessToken=function(){
    jwt.sign({
        _id:this.id,
        email:this.email,
        username:this.username,
        fullname:this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
};
userSchema.methods.getRefreshToken=function(){
    jwt.sign({
        _id:this.id,
        
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )
};


export const User=mongoose.model("User",userSchema);