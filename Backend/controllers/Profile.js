const Profile= require("../models/Profile");
const User= require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");




exports.updateProfile= async (req,res)=>{

try{
//get data
const {dateOfBirth="",about="",contactNumber, gender}= req.body;

//get userId
const id= req.user.id;
//validatation
if(!contactNumber || gender || !id){
    return res.status(400).json({
        success:false,
        message:"All field are required"
    });
}
//find profile
const userDetails= await User.findById(id);
const profileId= userDetails.additionalDetails;
const profileDetails= await Profile.findById(profileId);
//update profile
profileDetails.dateOfBirth= dateOfBirth;
profileDetails.about=about;
profileDetails.gender=gender;
profileDetails.contactNumber=contactNumber;
await profileDetails.save();
// return response
res.status(200).json({
    success:true,
    message:"Profile updated successfully",
    profileDetails,
})
}
catch(error){
    return res.status(501).json({
        success:false,
        message:"Profile is not updated Please try again"
    })

}


};
//delete account


exports.deleteAccount= async(req,res)=>{

try{
//get id
const id= req.user.id;
//validation
const userDetails= await User.findById({_id:id});
if(!userDetails){
    return res.status(404).json({
        success:false,
        message:"User not found"
    })
}
//delete profile
await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
//delete user
await User.findByIdAndDelete({_id:id})
//todo uneroll user from all enrolled course

res.status(200).json({
    success:true,
    message:"User Deleted Successfully",
})
//crone job 
}
catch(error){
return res.status(500).json({
    success:true,
    message:"Account not deleted"
})
}

};



exports.getAllUserDetails= async (req,res)=>{

try{
    const id= req.user.id
    //get user details
const userDetails= await User.findById(id).populate("additionalDetails").exec();

    //validation
    //response details
return res.status(200).json({
    success:true,
    message:"User Data Fetched Successfully",
    userDetails,
});

}   
catch(error){
return res.status(500).json({
    success:false,
    message:error.message,
});

} 

}


exports.updateDisplayPicture= async (req,res)=>{

try{

//fetch image
const displayPicture= req.files.displayPicture;
//fetech data
const {id}= req.user;
//upload cloudinary
const uploadImage= await uploadImageToCloudinary(displayPicture,process.env.FOLDER_NAME,1000,1000)
//update DB
const updatedProfile= await User.findByIdAndUpdate({_id:id},{image:uploadImage.secure_url},{new:true});

//response

res.status(200).json({
    success:true,
    message:"Image Updated successfully",
    updatedProfile,
})


}
catch(error){

return res.status(500).json({
        success: false,
        message: error.message,
      })



}

}


exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





// exports.getEnrolledCourses = async (req, res) => {

//     try {
//       const userId = req.user.id
//       const userDetails = await User.findOne({
//         _id: userId,
//       })
//         .populate("courses")
//         .exec()
//       if (!userDetails) {
//         return res.status(400).json({
//           success: false,
//           message: `Could not find user with id: ${userDetails}`,
//         })
//       }
//       return res.status(200).json({
//         success: true,
//         data: userDetails.courses,
//       })
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       })
//     }
// };