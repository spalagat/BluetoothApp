const express=require("express");
const router=express.Router();
const subjectController=require("./Subject/SubjectController");
router.use("/",subjectController);

module.exports=router;