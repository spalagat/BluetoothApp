let mysql=require("mysql");
let mongoose=require("mongoose");
const config=require("config");
const connectURL="mongodb://localhost:27017/bluetooth";
const connectToDatabase=async function(){
    try{
        let res=await mongoose.connect(connectURL,{useNewUrlParser:true,useUnifiedTopology:true});
        return "connection SuccessFul";
    }
    catch(error){
        throw error;
    }
    
    
};




module.exports=connectToDatabase;