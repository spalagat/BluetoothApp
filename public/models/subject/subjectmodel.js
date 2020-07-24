let mongoose=require("mongoose");
let Schema=mongoose.Schema;
let subjectSchema=new Schema({
    subjectid:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    students:[String],
    professorid:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        required:true
    }
});
let SubjectModel=mongoose.model("subjects",subjectSchema);
module.exports=SubjectModel;
