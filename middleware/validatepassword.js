const validator=require("validator");
function validatePassword(req,res,next)
{
    const {password}=req.body;
    if(!password)
    {
        return res.status(400).json({message:"Password is required"});

    }
    if(!validator.isStrongPassword(password,{
        minLength:6,
        minLowercase:1,
        minUppercase:1,
        minNumbers:1,
        minSymbols:1

    }))
    {
    return res.status(400).json({message:"Password must be atleast 6 characters and contain at least 1 number,1 symbol,1 uppercase and 1 lowercase"})

    }
    next();

}
module.exports=validatePassword;
