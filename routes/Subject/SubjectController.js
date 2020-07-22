const express=require("express");
const router=express.Router();
const bodyParser=require("body-parser");
const urlEncodedParser=bodyParser.urlencoded({extended:false});
const subjectAction=require("../../models/subject/subjectaction");
const { check,validationResult } = require("express-validator");
const authObj=require("../../auth/auth");

router.post("/addSubject",urlEncodedParser,[check("subjectid").not().isEmpty().withMessage("subjectid is required"),
                                            check("professorid").not().isEmpty().withMessage("professor id is required"),
                                            check("subjectname").not().isEmpty().withMessage("name is required"),
                                             check("semester").not().isEmpty().withMessage("semester is required ")],
                                             async function(req,res){
                                                 const errors=validationResult(req);
                                                 if(errors.isEmpty()){
                                                    let subjectid=req.body.subjectid;
                                                    let professorid=req.body.professorid;
                                                    let subjectname=req.body.subjectname;
                                                    let semester=req.body.semester;
                                                    try{
                                                        const subject=await subjectAction.addSubject(subjectid,subjectname,professorid,semester);
                                                        if(subject instanceof Error){
                                                            throw subject;
                                                        }
                                                        else{
                                                            const response={
                                                                result:true,
                                                                message:"Successfully added the subject "
                                                            }
                                                            res.status(200).send(response);
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
                                                         result:true,
                                                         message:errors.errors[0].msg
                                                     }
                                                     res.status(400).send(response);
                                                 }
                                             });
router.post("/getSubjects",urlEncodedParser,[check("professorid").not().isEmpty().withMessage("professorid is required"),check("semester").not().isEmpty().withMessage("semster is required")],
                            authObj.verify,async function(req,res){
                                const errors=validationResult(req);
                                if(errors.isEmpty()){
                                    let professorid=req.body.professorid;
                                    let semester=req.body.semester;
                                    try{
                                        let subjects=await subjectAction.getSubjects(semester,professorid);
                                        if(subjects instanceof Error){
                                            throw subjects;
                                        }
                                        else{
                                            const response={
                                                result:true,
                                                subjects:subjects
                                            }
                                            res.status(200).send(response);
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
router.post("/addStudent",urlEncodedParser,[check("subjectid").not().isEmpty().withMessage("subject id is required"),
                                            check("studentid").not().isEmpty().withMessage("studentid is required"),
                                            check("semester").not().isEmpty().withMessage("semster is required"),
                                            check("professorid").not().isEmpty().withMessage("professorid is required")],
            authObj.verify,async function(req,res){
                const errors=validationResult(req);
                if(errors.isEmpty()){
                    let subjectid=req.body.subjectid;
                    let studentid=req.body.studentid;
                    let semester=req.body.semester;
                    let professorid=req.body.professorid;
                    try{
                        let result=await subjectAction.addStudent(subjectid,professorid,semester,studentid);
                        if(result instanceof Error){
                            throw Error;
                        }
                        else{
                            const response={
                                result:true,
                                message:"sucessfully added the student"
                            }
                            res.status(200).send(response);
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
router.get("/students",authObj.verify,async function(req,res){
        console.log("Inside get method ")
        if(req.query!==undefined){
            let subjectid=req.query.subjectid;
            let professorid=res.locals.id;
            let semester=req.query.semester;
            try{
                let students=await subjectAction.getStudents(subjectid,professorid,semester);
                if(students instanceof Error){
                    throw students;
                }
                else{
                    const response={
                        result:true,
                        students:students
                    }
                    res.status(200).send(response);
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
});
module.exports=router;