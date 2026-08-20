import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiErrors.js"
import { User } from "../models/user.model.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req, res)=>{
    //take data from the user
    const {username, email, fullName, password} = req.body;
    /*
    res.send(`${username} + ${email}`);
    console.log(email, username);

    // Validate the data coming from the user Method 1
    if (fullName === ""){
        throw new ApiError(400, "full name is required")
        res.send(error.message)
        break;
    }
    */

    // Validate the data coming from the user Method 2
    if([username, email, fullName, password].some((field)=> field?.trim()==="")){
        throw new ApiError(400, "All fields are required");
    }

    //User existence check
    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })
     
    if(existedUser){
        throw new ApiError(409, "User exists");
    }

    //Avatar check
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    //Upload files to cloudinary
    const avatar = await uploadonCloudinary(avatarLocalPath)
    const coverImage = coverImageLocalPath?await uploadonCloudinary(coverImageLocalPath):null

    //User existence confirmation
    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "User not created")
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User Registration succesful"))
})

export {registerUser}











// struct Node{
//     int Val;
//     struct Node* next;
// };

// struct LL{
//     Node* top = nullptr;
//     Node* last = nullptr;
//     int size = 0;
//     LL(){}
//     void insert(int n){
//         Node* nd = (Node *)malloc(sizeof(struct Node));
//         nd->Val = n;
//         nd->next = nullptr;
//         if (size==0){
//             top = nd;
//         }else{
//             last->next = nd;
//         }
//             last = nd;
//             size++;
//     }
// }