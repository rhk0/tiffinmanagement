import JWT from "jsonwebtoken"

import userModel from "../models/userModel.js"

export const requireSignIn = async (req, res, next) => {
    try {
      // Ensure the token is provided and in the correct format
      const authHeader = req.headers.authorization;
  
      // Check if the Authorization header exists and starts with 'Bearer'
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing or invalid" });
      }
  
      // Extract the token from the header
      const token = authHeader.split(" ")[1];
  
      // Verify the token
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
  
      // Attach the decoded user info to the request
      req.user = decoded;
      
      // Move to the next middleware
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized, invalid token", error });
    }
  };
  


//admin access
export const isAdmin=async(req,res,next)=>{
    try {
      

        const user=await userModel.findById(req.user._id)
      
        if(user.role!==1 ||  user.status!=="Active")
        {
          
            return res.status(401).send({success:false,message:"UnAuthorized Access U r not the AdminDharma...!"})
        }
        else{
            next();
        }
        
    }catch (error) {

        console.log(error)
        res.status(401).send({success:false,message:"You are not an Admin , UnAuthorized Access...!",error})
        
    }

}

//Super admin access
export const isSuperAdmin=async(req,res,next)=>{
    try {

        const user=await userModel.findById(req.user._id)
        
        if(user.role!==2)
        {
            return res.status(401).send({success:false,message:"UnAuthorized Access You Are not  Super Admin..!"})
        }
        else{
            next();
        }
        
    }catch (error) {

        console.log(error)
        res.status(401).send({success:false,message:"You are not an Super Admin , UnAuthorized Access...!",error})
        
    }
  
}
//staff access

export const isStaff =async(req,res,next)=>{
    try {
                 
        const user = await userModel.findById(req.user._id).populate("admin")
          
        if(user.role!==0  ||  user.admin.status!=="Active")  
        {
            return res.status(401).send({success:false,message:"UnAuthorized Access U r not the Admin...!"})
        }
        else{
            next();
        }
         
    }catch (error) {
     
      
        res.status(401).send({success:false,message:"You r not an Staff , UnAuthorized Access...!",error})
                    
    }
}

