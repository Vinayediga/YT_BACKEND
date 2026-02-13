import mongoose from "mongoose";
import jwt from 'jsonwebtoken'//bearer(owner of the token is bearer) token
import bcrypt from bcrypt

const UserSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true,
        trim:true
    },
     Email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    fullName:{
        type:String,
        unique:true,
        lowercase:true,
    },
    Avatar:{
        type:String,
        required:true,
    },
    CoverImage:{
        type:String,
        required:true,
        
    },
    Password:{
        type:String,
        required:true,
        trim:true
    },
    refreshToken:{
        type:String,
        required:true
    },
    watchHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }]   

},{timestamps:true})




export const User =  mongoose.model("User",UserSchema)

User.pre("save",async function(next){
    if(!this.isModified("Password")) return next();
    this.Password = await bcrypt.hash(this.Password,10);
    next()
})

UserSchema.methods.isPasswordCorrect = async function(password){

      return   await  bcrypt.compare(password,this.Password)
    }
UserSchema.method.generateAccessToken =  function(){
   jwt.sign({
    _id:this._id,
    email:this.Email,
    username:this.Username
   },process.env.ACCESS_TOKEN_SECRET,{
    expiryIn:process.env.ACCESS_TOKEN_EXPIRY
   })
}
UserSchema.method.refreshAccessToken =  function(){
     jwt.sign({
    _id:this._id,
   },process.env.ACCESS_TOKEN_SECRET,{
    expiryIn:process.env.ACCESS_TOKEN_EXPIRY
   })
}

