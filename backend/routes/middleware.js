import jwt from "jsonwebtoken";

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      res.status(500).json({ message: error.message });
    });
  };

export const userMiddleware = (req,res,next)=>{
    try {
        const token = req.cookies['token'];
        const user = jwt.verify(token,process.env.JWT_SECRET);
        console.log(user)
        if(!user){
            res.json({response:"User Not Authenticated"});
        }else{
            req.user = user.id;
            next()
        }
    } catch (error) {
        console.log(`Error in userMiddleware`);
    }
}  

export const adminMiddleware = (req,res,next)=>{
    try {
        const token = req.cookies['token'];
        const admin = jwt.verify(token,process.env.JWT_SECRET);
        console.log(admin)
        if(admin.id && admin.role == "admin"){
           req.user = admin.id; 
           next();
        }else{
            res.json({response : "you're not a admin to access this page"})
        }
    } catch (error) {
        console.log(`Error in Admin Middleware`)
    }
}

export default asyncHandler;