import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const videoSchema = new mongoose.Schema({
    videoFile:{
        type: String,
        required: true,
    },
    thumbNail:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    duration:{
        type: Number, // duration of video file will be sent as a response by cloudinary after video upload
        required: true
    },
    views:{
        type: Number,
        default : 0
    },
    isPublished:{
        type: Boolean,
        default: true
    },
    videoOwner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, 
{timestamps: true})

videoSchema.plugin(mongooseAggregatePaginate); //https://chatgpt.com/share/6a7f53d8-7520-83ee-95ac-8b35199c682c <- Why?

export const Video= mongoose.model("Video", videoSchema)