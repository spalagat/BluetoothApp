const express=require("express");
const router=express.Router();
const bodyParser=require("body-parser");
const urlencodedParser=bodyParser.urlencoded({ extended: false });
const jsonParser=bodyParser.json();
const {check,validationResult}=require("express-validator");
const studentAction=require("../../models/student/studentaction");
const bcrypt=require("bcryptjs");

const passwordHash=require("../../passwordHash");
const authObj=require("../../auth/auth");
/**
 * SignUp Router which is used to register the student. 
 * The input it takes is studentid,password,imageurl
 */
router.post("/signup",urlencodedParser,[check("studentid").not().isEmpty().withMessage("id should not be empty").isNumeric().withMessage("id should be a number"),
                                        check("password").not().isEmpty().withMessage("password should not be empty"),
                                    check("imageurl").isURL().withMessage("image url is invalid")],async function(req,res){
                                        let errors=validationResult(req);
                                        if(errors.isEmpty()){
                                            try{
                                                const studentid=req.body.studentid;
                                                const password=req.body.password;
                                                const imageurl=req.body.imageurl;
                                                const passwordhash=await passwordHash(password)
                                                const result=await studentAction.addUser(studentid,passwordhash,imageurl);
                                                if(result instanceof Error){
                                                    throw result;
                                                }
                                                else{
                                                    const response={
                                                        result:true,
                                                        message:"successfully added the user"
                                                    };
                                                    res.send(response);
                                                }

                                            }
                                            catch(error){
                                                const response={
                                                    result:false,
                                                    message:error.message
                                                }
                                                res.status(400).send(response);
                                            }

                                        }
                                        else{
                                            const response={
                                                result:false,
                                                message:errors.errors[0].msg
                                            }
                                            res.status(400).send(response);
                                        }
    
});
/**
 * Login Router which takes studentid,password,imageurl and returns a JWT token.
 */
router.post("/login",urlencodedParser,[check("studentid").not().isEmpty().withMessage("student id is required").isNumeric().withMessage("studentid should be numeric"),
                      check("password").not().isEmpty().withMessage("Password should not be empty"),
                       check("imageurl").not().isEmpty().withMessage("Should not be Empty").isURL().withMessage("Not a valid Url")],
                       async function(req,res){
                            let errors=validationResult(req);
                            console.log("Inside login method ");
                            if(errors.isEmpty()){
                                let studentid=req.body.studentid;
                                let password=req.body.password;
                                console.log("Inside if condition ",studentid+","+password);
                                try{
                                    const student=await studentAction.getUser(studentid);
                                    if(student instanceof Error){
                                        throw student;
                                    }
                                    else{
                                        let result=await bcrypt.compare(password,student.password);
                                        if(result){
                                            console.log("passwords got matched "+student.uid);
                                            let token=authObj.generateToken(student,"student");
                                            const response={
                                                result:true,
                                                message:token
                                            }
                                            res.status(200).send(response);
                                        }
                                        else{
                                            const response={
                                                result:false,
                                                message:"Incorrect password"
                                            }
                                            res.status(200).send(response);
                                        }
                                    }
                                }
                                catch(error){
                                    const response={
                                        result:false,
                                        message:error.message
                                    }
                                    res.status(400).send(response);
                                }
                                
                            }
                            else{
                                console.log("INside else method ");
                                const response={
                                    result:false,
                                    message:errors.errors[0].msg
                                };
                                console.log(response);
                                res.status(400).send(response);
                            }
                       });
module.exports=router;