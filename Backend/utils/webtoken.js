import jwt from "jsonwebtoken";
export const generatetokenandcookie=(userId,res)=>{
      const token=jwt.sign({userId},process.env.JWT_KEY,{expiresIn:"24h",

      })
      res.cookie("jwt",token,{
         maxAge:24*60*60*1000,
         httpOnly:true,
         sameSite:"strict"
      });
};

