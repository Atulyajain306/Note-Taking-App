import  jwt  from "jsonwebtoken"

const protectroute = async(req,res,next) => {
     try{
            const t=req.cookies.jwt;
          if(!t){
           return res.status(401).json({error:"Token not Assigned"});
          } 
          const decoded = jwt.verify(t,process.env.JWT_KEY);
          if(!decoded){
           return  res.status(401).json({error:"Token not Assigned"});
          }
        
          req.user=decoded;
        next();
     }catch(error){
         return res.status(500).json({error:"Internal Server Error"})
     }
}

export default protectroute