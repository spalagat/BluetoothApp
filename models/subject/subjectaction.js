let SubjectModel=require("./subjectmodel");
let professorAction=require("../professor/professoractions");
class Subject{
    async addSubject(subjectid,subjectname,professorid,semester){
        try{
            console.log("Inside add subject method ",semester);
            let subject=await SubjectModel.findOne({subjectid:subjectid,professorid:professorid,semester:semester});
            let professor=await professorAction.getProfessor(professorid);
            if(subject!==null){
                console.log("Subject exists ");
                throw new Error("subject already exists");
            }
            else if(professor===null){
                console.log("professor does not exist");
                throw new Error("Professor Does Not Exist");
            }
            else{
                console.log("about to add the subject ");

                subject=new SubjectModel({subjectid:subjectid,name:subjectname,professorid:professorid,semester:semester,students:[]});
                console.log(await subject.save());
                return true;
            }
        }
        catch(error){
            console.log("inside catch method ");
            return error;
        }
    }
    async getSubject(subjectid,professorid,semester){
        try{
            let subject=await SubjectModel.findOne({subjectid:subjectid,professorid:professorid,semester:semester});
            if(subject===null){
                throw new Error("Subject does not exist ");
            }
            else{
                return subject;
            }
        }
        catch(error){
            return error;
        }
    }
    async addStudent(subjectid,professorid,semester,studentid){
        try{
            let subject=await SubjectModel.findOne({subjectid:subjectid,professorid:professorid,semester:semester});
            if(subject===null){
                throw new Error("Subject does not exist");
            }
            else{
                let students=subject.students;
                students.push(studentid);
                await subject.save();
                return true;
            }
        }
        catch(error){
            return error;
        }
    }
    async addDate(subjectid,professorid,semester,date){
        try{
            let subject=await SubjectModel.findOne({subjectid:subjectid,professorid:professorid,semester:semester});
            if(subject===null){
                throw new Error("subject does not exist");
            }
            else{
                let dates=subject.dates;
                dates.push(date);
                await subject.save();
            }
        }
        catch(error){
            return error;
        }
    }
    async getStudents(subjectid,professorid,semester){
        try{
            let subject=await SubjectModel.findOne({subjectid:subjectid,professorid:professorid,semester:semester});
            if(subject===null){
               return [];
            }
            else{
                let students=subject.students;
                return students;
            }
        }
        catch(error){
            return error;
        }
    }
    async getDates(subjectid,professorid,semester){
        try{
            let subject=await SubjectModel.findOne({subjectid:subjectid,professorid:professorid,semester:semester});
            if(subject===null){
                throw new Error("Subject doesnot exist");
            }
            else{
                let dates=subject.dates;
                return dates;
            }
        }
        catch(error){
            return error;
        }
    }
    async studentExists(subjectid,professorid,semester,studentid){
        try{
            let subject=await SubjectModel.findOne({subjectid:subjectid,professorid:professorid,semester:semester});
            if(subject===null){
                throw new Error("Subject doesnot exist ");
            }
            else{
                let students=subject.students;
                for(let i=0;i<students.length;i++){
                    if(students[i]===studentid){
                        return true;
                    }
                }
                return false;

            }
        }
        catch(error){
            return error;
        }
    }
    async getSubjects(semester,professor){
        try{
            let subjects=await SubjectModel.find({semester:semester,professorid:professor});
            return subjects;
        }
        catch(error){
            return error;
        }
        
    }
}
module.exports=new Subject();