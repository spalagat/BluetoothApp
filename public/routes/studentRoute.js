const express=require("express");
const router=express.Router();
const loginController=require("./student/LoginController");
router.use("/account",loginController);
const studentController=require("./student/StudentController");
router.use("/other",studentController);
module.exports=router;