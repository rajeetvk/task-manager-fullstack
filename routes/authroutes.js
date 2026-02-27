
const express = require("express");
const validateEmail=require("../middleware/validateemail")
const validatePassword = require("../middleware/validatepassword");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/db");
const router=express.Router();
const SECRET_KEY = process.env.SECRET_KEY;


router.post("/signup",validateEmail,validatePassword,async(req,res)=>{
    const {email,password,name}=req.body;
    
    if(!email || !password || !name)
    {
        return res.status(400).json({message:"All field are required"});
    }
    try{
        const hashedpassword= await bcrypt.hash(password,10);
    
    db.query("INSERT INTO users (email,password,name) VALUES (?,?,?)",
        [email,hashedpassword,name],
        (err,result)=>{
            if(err)
            {
                 if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({message:"Email already registered"});
    }
                return res.status(500).json({message:"Database error"});
            }
            res.json({message:"User registered successfully"});
        }
    )
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message:"Error hashing password"});
    }
});

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({message:"Email and password required"});
    }

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {

            if (err)
                return res.status(500).json({message:"Database error"});

            if (result.length === 0)
                return res.status(400).json({message:"User not found"});

            const user = result[0];

            const ismatch = await bcrypt.compare(password, user.password);

            if (!ismatch)
                return res.status(400).json({message:"Wrong password"});

            const token = jwt.sign(
                { id: user.id, email: user.email },
               SECRET_KEY,
                { expiresIn: "1h" }
            );
            
            res.json({
                message: "Login successful",
                token: token
            });
        }
    );
});


module.exports=router;