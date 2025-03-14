import jwt from "jsonwebtoken";
export const generatetokenandcookie=(userId,res)=>{
      const token=jwt.sign({userId},process.env.JWT_KEY,{expiresIn:"3d",

      })
      res.cookie("jwt",token,{
         maxAge:3*24*60*60*1000,
         httpOnly:true,
         sameSite:"strict"
      });
};

