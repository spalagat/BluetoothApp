let mongoose=require("mongoose");
let Schema=mongoose.Schema;
let professorSchema=new Schema({
    uid:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        password:true
    }
});
let professorModel=mongoose.model("professors",professorSchema);
module.exports=professorModel;