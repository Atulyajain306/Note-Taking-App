import Audio from "../models/Audio.js"
const GetAudioMessage = async(req,res) => {
              try{
                   let {transcript,title}=req.body;
                    const User= new Audio({
                        message:transcript,
                        title,
                        userId:req.user.userId   
                    });
                  await User.save(); 
                  console.log(User);
                 res.status(200).json({data:User});  
              }
              catch(error)
              {
                console.log(error)
              }
            }

export default GetAudioMessage