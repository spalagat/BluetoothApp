const express=require('express');
const router=express.Router();
const bodyParser=require("body-parser");
const urlEncodedParser=bodyParser.urlencoded({extended:false});
const {check,ValidationResult, validationResult}=require("express-validator");
const studentActions=require("../../models/student/studentaction");
const authObj=require("../../auth/auth");

router.post("/addSubject",urlEncodedParser,[check("subjectid").not().isEmpty().withMessage("Subjectid is required")],authObj.verify,
            async function(req,res){
                const errors=validationResult(req);
                if(errors.isEmpty()){
                    let studentid=res.locals.id;
                    let subjectid=req.body.subjectid;
                    try{
                        let result=await studentActions.addSubject(studentid,subjectid);
                        if(result instanceof Error){
                            throw result;
                        }
                        else{
                            const response={
                                result:true,
                                message:"Successfully added the subject"
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

router.post("/addDate",urlEncodedParser,[check("subjectid").not().isEmpty().withMessage("subject id is required"),
                                        check("date").not().isEmpty().withMessage("Date is required")],
                                        authObj.verify,async function(req,res){
                                            const errors=validationResult(req);
                                            if(errors.isEmpty()){
                                                let studentid=res.locals.id;
                                                let date=req.body.date;
                                                let subjectid=req.body.subjectid;
                                                try{
                                                    let dateObj= await studentActions.addDate(studentid,subjectid,date);
                                                    if(dateObj instanceof Error){
                                                        throw date;
                                                    }
                                                    else{
                                                        const response={
                                                            result:true,
                                                            message:"successfully added the date"
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
router.get("/dates",authObj.verify,async function(req,res){
    if(req.query!==undefined){
        const subjectId=req.query.subjectid;
        const studentid=res.locals.id;
        try{
            const result=await studentActions.getDates(studentid,subjectId);
            if(result instanceof Error){
                throw result;
            }
            else{
                const response={
                    result:true,
                    dates:result
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
router.get("/subjects",authObj.verify,async function(req,res){
    try{
        const studentid=res.locals.id;
        const subjects=await studentActions.getSubjects(studentid);
        if(subjects instanceof Error){
            throw subjects;
        }
        else{
            const response={
                result:false,
                subjects:subjects
            };
            res.status(200).send(response);
        }
    }
    catch(error){
        const response={
            result:false,
            message:error.message
        };
        res.status(400).send(response);
    }
});

module.exports=router;
