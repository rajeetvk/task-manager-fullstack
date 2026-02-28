require("dotenv").config();
const path = require("path");
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




/*const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});*/


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});


