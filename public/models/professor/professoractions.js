let ProfessorModel=require("./professormodel.js");
const jwt=require("jsonwebtoken");
const config=require("config");
class Professor{
    async addProfessor(professorid,password){
        try{
            console.log("Inside add professor method ");
            let professor=await ProfessorModel.findOne({uid:professorid});
            if(professor!==null){
                throw new Error("user already exists");
            }
            else{
                professor=new ProfessorModel({uid:professorid,password:password});
                await professor.save();
                return true;
            }
        }
        catch(error){
            return error;
        }
    }
    async getProfessor(professorid){
        try{
            console.log("Inside get professor method")
            let professor=await ProfessorModel.findOne({uid:professorid});
            if(professor==null){
                console.log("Did not find the user");
                throw new Error("User Does Not Exist");
            }
            else{
                console.log("returning the professor");
                return professor;
            }
        }
        catch(error){
            console.log("Inside catch block "+error.message);
            return error;
        }
    }
    
    async authorize(professorid){
        try{
            let professor=await ProfessorModel.findOne({uid:professorid});
            if(professor===null){
                return false;
            }
            else{
                return true;
            }
        }
        catch(error){
            return error;
        }
    }
}
module.exports=new Professor();