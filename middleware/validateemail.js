const validator=require("validator");
function validateEmail(req,res,next)
{
    const {email}=req.body;
    if(!email)
    {
        return res.status(400).json({message:"Email is required"});
    }
    if(!validator.isEmail(email))
    {
        return res.status(400).json({message:"Invalid email format"});
    }
    const normailizedemail=validator.normalizeEmail(email);
    req.body.email=normailizedemail;
    next();
            
        

}
module.exports=validateEmail;