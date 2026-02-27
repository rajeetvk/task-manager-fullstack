 const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
 function validatetoken(req, res, next) {

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({message:"No Token Provided"});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;  // attach user info
        next();              // move to next route
    } catch (error) {
        return res.status(403).json({message:"Invalid or Expired Token"});
    }
}

module.exports=validatetoken;