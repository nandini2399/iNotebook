var jwt = require('jsonwebtoken');
const JWT_SECRET = "shhhhhhh";

const fetchUser = (req,res,next) =>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({error:"Authenticate using valid token"});
    }

    try{
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch(error){
        console.log(error.message)
        res.send(401);
    }

    
}

module.exports = fetchUser;