import mongoose from "mongoose"
const dbconnection=()=>{
   mongoose
   .connect(process.env.MONGODB_URI ,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 
  })
   .then(()=>{console.log("MongoDB Connnected")}) 
   .catch(err => console.log(err.message));  
}

export default dbconnection