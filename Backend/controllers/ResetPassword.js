const User= require("../models/User")
const mailSender= require("../utils/mailSender");
const bcrypt= require("bcrypt");
const crypto= require("crypto");
//resetpasswordToken
exports.resetPasswordToken= async (req,res)=>{
    try{
//get email
const {email}= req.body;
//check user validation
const user= await User.findOne({email});
if(!user){
    return res,json({
        success:false,
        message:"Your Email is not registered with us"
    })
}
//token generate
const token= crypto.randomUUID();
//update user by adding token and expiration time
const updatedDetails= await User.findOneAndUpdate({email},{token:token,resetPasswordExpires:Date.now()+20*60*1000},{new: true})
//link generate
const url= `http://localhost:5173/update-password/${token}`
//send email
await mailSender(email,"Password Rest Link",`Password Reset Link :${url}`)

//return respnse
return res.status(200).json({
    success:true,
    message:"Email send Successfully, please check your email and change password",
})

    }
    catch(error){
console.log(error);
return res.status(501).json({
    success:false,
    message:"something went wrong while reset password"
})

    }
}



//resetPassword


exports.resetPassword= async (req, res)=>{
try{

    //data fetech

const {password, confirmPassword, token}= req.body;

    //validaion
if(password!==confirmPassword){
    return res.status(401).json({
        success:false,
        message:"Password not matching",
    })
}

    //get userdatails from from db using db

const userDetails= await User.findOne({token:token})

    //token time check
    if(!userDetails){
        return res.status(400).json({
            success:false,
            message:"Token is not Valid"
        })
    }
    //token time check
    if(userDetails.resetPasswordExpires<Date.now()){
        return res.json({
            success:false,
            message:"Token is expired,please regenerate your token",
        });
    }
    //hashpassword

    const hashpassword= await bcrypt.hash(password,10);
    //update pass
    await User.findOneAndUpdate({token:token},{password:hashpassword},{new:true})
    //return response

    return res.status(200).json({
        success:true,
        message:"Password reset Successfull"
    })

}catch(error){
console.log(error);
return res.status(501).json({
    success:false,
    message:"something went wrong while reset password"
})

    }

}