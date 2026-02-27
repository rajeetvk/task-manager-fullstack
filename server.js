require("dotenv").config();

const express=require("express");
const authroutes = require("./routes/authroutes");
const userroutes = require("./routes/userroutes");
const taskroutes=require("./routes/taskroutes");




const app= express();
app.use(express.json());
app.use(express.static("public"));
app.use("/api/auth", authroutes);
app.use("/api/user", userroutes);
app.use("/api/tasks",taskroutes);




app.listen(5000,()=>{
    console.log("Server running on port 5000")
})


