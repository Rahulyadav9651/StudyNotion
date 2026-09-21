
 require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express= require("express");
const app= express();
const userRouter= require("./routes/User");
const profileRouter= require("./routes/Profile");
const paymentRouter= require("./routes/Payment");
const courseRouter= require("./routes/Course");
const database= require("./config/database");

//const contactus= require("./routes/Contact");
//const contactUsRoute = require("./routes/Contact");
const contact = require("./routes/contact");
const cookieParser= require("cookie-parser");
const cors=require("cors");
const {cloudinaryConnect}= require("./config/cloudinary");
//const fileUpload= require("express-fileupload");
const fileUpload = require("express-fileupload");



 const PORT= process.env.PORT || 4000;
 //databseConnect
 database.DbConnect();
 app.use(express.json());
 app.use(cookieParser());
 
app.use(
    cors({
        origin: "https://studynotion-94c5e.web.app",
        credentials: true,
    })
);


 
//  app.use(
//     fileUpload({
//         useTempFiles:true,
//         tempFileDir:"/tmp",

//     })
//  )
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);
 //cloudinary connection
 cloudinaryConnect();
 app.use("/api/v1/auth",userRouter);
  app.use("/api/v1/profile",profileRouter);
   app.use("/api/v1/course",courseRouter);
    app.use("/api/v1/payment",paymentRouter);
app.use("/api/v1/reach", contact);
    app.get("/",(req, res)=>{
        return res.json({
            success:true,
            message:"Your server is up and running..."
        })
    })

    app.listen(PORT,()=>{
        console.log(`App is runnning at ${PORT}`)
    })


