import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true // interesting topic to learn, enabled for efficient searching
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar:{
        type: String, // cloudinary URL
        required: true,
    },
    coverImage:{
        type: String, // cloudinary URL
    },
    watchHistory:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }
    ],
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken:{
        type: String
    }
}, {timestamps: true})

// https://chatgpt.com/share/6a7f561c-5718-83e8-9849-a18a6be15847 <- Why not use an arrow function here 
// userSchema.pre("save",()=>{})
userSchema.pre("save",async function (err, req, res, next){
    if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
})

/*Attaching a method to the UserSchema , That means every User document created from this schema gets this method.
const user = await User.findOne({ username: "amber" });

user.isPasswordCorrect(...)
*/
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = async function (){
    return await jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET, 
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.generateRefreshToken = async function (){
    return await jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        fullName: this.fullName
    },
    process.env.REFRESH_TOKEN_SECRET, 
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const User = mongoose.model("User", userSchema)