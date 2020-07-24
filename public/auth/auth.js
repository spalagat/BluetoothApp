
var jwt=require("jsonwebtoken");
var config=require("config");
const studentAction=require("../models/student/studentaction");
const professorAction=require("../models/professor/professoractions");

class Authorization{
    generateToken(user,type){
            console.log("Inside generateAuthToken "+user.uid);
            var jwtObj={id:user.uid,type:type};
            const token=jwt.sign(jwtObj,config.get("jwtPrivateKey"));
            return token;

    }
    async verify (req,res,next){
        console.log("Inside middleware function");
        console.log(req.query);
        if(req.query && req.query.id!==undefined){
            var token=req.query.id;
            var decode=jwt.verify(token,config.get("jwtPrivateKey"), async function(err,object){
                if(err){
                    const response={
                        posted:false,
                        message:err.message
                    };
                    res.status(400).send(response);
                }
                else{
                    try{
                        let type=object.type;
                        let uid=object.uid;
                        if(type==='student'){
                            let result=await studentAction.authorize(object.id);
                            if(result instanceof Error){
                                throw result;
                            }
                            if(!result){
                                const response={
                                    result:false,
                                    message:"not a valid token"
                                };
                                res.status(400).send(response);
                            }
                            else{
                                res.locals.id=object.id
                                next();
                            }
                        }
                        else{
                            let result=await professorAction.authorize(object.id);
                            if(result instanceof Error){
                                throw result;
                            }
                            if(!result){
                                const response={
                                    result:false,
                                    message:"not a valid token"
                                };
                                res.status(400).send(response);
                            }
                            else{
                                res.locals.id=object.id;
                                next();
                            }

                        }
                        
                    }
                    catch(error){
                        const response={
                            posted:false,
                            message:error.message
                        }
                        res.status(400).send(response);
                    }
                    
                }
    
    
            });
            
            
        }
        else{
            response={
                posted:false,
                message:"id is required,please ligin to get one"
            }
            res.status(400).send(response);
        }
    }
}

module.exports=new Authorization();