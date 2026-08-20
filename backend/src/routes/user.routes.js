import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get((req, res)=>{
    res.status(399).json("Hello");
})

/*
//Normal route without file upload

router.route("/register").post(registerUser)
*/

// Route with file upload

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount:1
        }
    ]),
registerUser
)


export default router