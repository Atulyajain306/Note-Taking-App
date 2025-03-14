import jwt from "jsonwebtoken";
export const generatetokenandcookie=(userId,res)=>{
      const token=jwt.sign({userId},process.env.JWT_KEY,{expiresIn:"2m",

      })
      res.cookie("jwt",token,{
         maxAge:2*60*1000,
         httpOnly:true,
         sameSite:"strict"
      });
};

