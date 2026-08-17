import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/").get((req, res)=>{
    res.status(399).json("Hello");
})
router.route("/register").post(registerUser)

export default router