let StudentModel=require("./studentmodel.js");
const jwt=require("jsonwebtoken");
const config=require("config");

class StudentActions{
    async addUser(studentid,password,imageurl){
        try{
            console.log("Inside add user method "+studentid);
            let result=await StudentModel.findOne({uid:studentid});
            if(result!=null){
                console.log("user does exists");
                throw new Error("User already exists");
            }
            else{
                console.log("user does not exist")
                let student=new StudentModel({uid:studentid,password:password,imageurl:imageurl});
                await student.save()
                return true;
            }
        }
        catch(error){
            return error;
        }
    }
    async getUser(studentid){
        try{
            let result=await StudentModel.findOne({uid:studentid});
            if(result==null){
                throw new Error("Invalid Id");
            }
            else{
                return result;
            }
        }
        catch(error){
            return error;
        }
    }
    async addSubject(studentid,subjectid){
        try{
            
            
            let result=await StudentModel.findOne({uid:studentid});
            if(result===null){
                throw new Error("Invalid id");
            }
            else{
                console.log("Inside else condition : ",result);
                let subObj={
                    subjectid:subjectid,
                    dates:[]
                }
                console.log("SubObj",subObj);
                console.log(result.subjects);
                let subjects=result.subjects;
                subjects.push(subObj);

                
                await result.save();
                return true;
            }
        }
        catch(error){
            return error;
        }
    }
    async addDate(studentid,subjectid,date){
        try{
            let user=await StudentModel.findOne({uid:studentid});
            if(user === null){
                throw new Error("Invalid Id");
            }
            else{
                let subjects=user.subjects;
                subjects.forEach(subject => {
                    if(subject.subjectid===subjectid){
                        subject.dates.push(date);
                    }
                });
            }
            await user.save();
            return true;
        }
        catch(error){
            throw error;
        }
    }
    async getSubjects(studentid){
        console.log("Inside getsubjects method");
        try{
            let result=await StudentModel.findOne({uid:studentid});
            if(result===null){
                throw new Error("Invalid UserId");
            }
            else{
                return result.subjects;
            }
        }
        catch(error){
            return error;
        }
    }
    async getDates(studentid,subjectid){
        try{
            console.log("Inside getDates method ");
            let result=await StudentModel.findOne({uid:studentid});
            if(result===null){
                throw new Error("Invalid User ");
            }
            else{
                console.log("Inside else method "+subjectid);
                let subjects=result.subjects;
                let dates=[];
                for(let i=0;i<subjects.length;i++){
                    let subject=subjects[i];
                    if(subject.subjectid===subjectid){
                        return subject.dates;
                    }
                }
                
                throw new Error("Subject not found ");
                
                
                
            }
        }
        catch(error){
            return error;
        }
    }
    async authorize(studentid){
        try{
            let student=await StudentModel.findOne({uid:studentid});
            if(student===null){
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
module.exports=new StudentActions();