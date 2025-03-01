const Logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out Succesfully"});
    }catch(error){
        console.log(error);
    }
}
export default Logout