require("dotenv").config();
const mongoose= require("mongoose");



exports.DbConnect=()=>{

mongoose.connect(process.env.DATABASE_URL,{
    
   
})
.then(()=>console.log("Database connect Successfully"))
.catch((error)=>{
    console.error(error);
    console.log("Database Not connected");
    process.exit(1);

})


}