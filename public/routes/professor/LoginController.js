const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');
const urlEncodedParser=bodyParser.urlencoded({extended:false}); 
const professorAction=require("../../models/professor/professoractions");
const { check,validationResult } = require('express-validator');
const passwordHash=require("../../passwordHash");
const { error } = require('console');
const bcrypt=require("bcryptjs");
const authObj=require("../../auth/auth");
console.log("Inside professor login");

router.post("/signup",urlEncodedParser,[check('professorid').not().isEmpty().withMessage("Id is required")
                       ,check('password').not().isEmpty().withMessage("password is required")],
                        async function(req,res){
                            const errors=validationResult(req);
                            if(errors.isEmpty()){
                                let professorid=req.body.professorid;
                                let password=req.body.password;
                                try{
                                    password=await passwordHash(password);
                                    let result=professorAction.addProfessor(professorid,password);
                                    if(result instanceof Error){
                                        throw error;
                                    }
                                    else{
                                        const response={
                                            result:true,
                                            message:"Succesfully Added the User"
                                        }
                                        res.send(response);
                                    }
                                }
                                catch(error){
                                    const response={
                                        result:false,
                                        message:error.message
                                    }
                                    res.send(response);
                                }
                            }
                            else{
                                const response={
                                    result:false,
                                    message:errors.errors[0].msg
                                };
                                res.status(400).send(response);
                            }
                        });
    router.post("/login",urlEncodedParser,[check('professorid').not().isEmpty().withMessage("ID is required"),
                            check('password').not().isEmpty().withMessage('Password is required')],
                             async function(req,res){
                                 const errors=validationResult(req);
                                 if(errors.isEmpty()){
                                    console.log("Did not found the errors");
                                    let professorid=req.body.professorid;
                                    let password=req.body.password;
                                    try{
                                        console.log("Inside try block");
                                        let professor=await professorAction.getProfessor(professorid);
                                    if(professor instanceof Error){
                                        throw professor;
                                    }
                                    else{
                                            let compareResult=await bcrypt.compare(password,professor.password);
                                            if(compareResult){

                                                let token=authObj.generateToken(professor,"professor");
                                                const response={
                                                    result:true,
                                                    message:token
                                                };
                                                res.send(response);
                                            }
                                            else{
                                                const response={
                                                    result:false,
                                                    message:"InCorrect Password"
                                                }
                                                res.send(response);
                                            }
                                        }
                                    }
                                    catch(error){
                                        const response={
                                            result:false,
                                            message:error.message
                                        }
                                        res.send(response);
                                    }
                                 }
                                 else{
                                     const response={
                                         result:false,
                                         message:errors.errors[0].msg
                                     }
                                     res.send(response);
                                 }
                             });
module.exports=router;