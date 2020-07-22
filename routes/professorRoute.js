const express=require('express');
const router=express.Router();
const login=require("./professor/LoginController");
console.log("Inside professort router");
router.use("/account",login);
module.exports=router;