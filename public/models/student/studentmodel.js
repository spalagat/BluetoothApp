let mongoose=require("mongoose");
const Schema=mongoose.Schema;
let schema=new Schema({
    uid:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    imageurl:{
        type:String,
        required:true
    },
    subjects:[{
        subjectid:String,
        dates:[Date]
    }]
});
var StudentModel=mongoose.model("students",schema);
module.exports=StudentModel;
