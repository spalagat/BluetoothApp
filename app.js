var express=require("express");//Importing the express module.
const app=express();//creating an app using express module.
var connectMethod=require("./DatabaseConnection.js");
const studentLogin=require("./routes/student/LoginController");
const professorRouter=require("./routes/professorRoute");
const studentRouter=require("./routes/studentRoute");
const subjecRouter=require("./routes/SubjectRoute");


connectMethod()
.then((result)=>{
    console.log("Database connection is Successful");
    if(result instanceof Error){
        throw result;
    }
    app.use("/professor",professorRouter);
    app.use("/student",studentRouter);
    app.use("/subject",subjecRouter);
    app.listen(3000,function(){
        console.log("Started the server");
    })
})
.catch((error)=>{
    console.log(error.message);
});