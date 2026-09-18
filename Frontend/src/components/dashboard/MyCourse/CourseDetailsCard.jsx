import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import {ACCOUNT_TYPE} from "../../../utils/constants"
import { addToCart } from "../../../slices/cartSlice";
import { useDispatch } from "react-redux";
import { FaShareSquare } from "react-icons/fa";

const CourseDetailsCard = ({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) => {
  const { user } = useSelector((state) => state.profile)
const {token}= useSelector((state)=>state.auth);
  const navigate = useNavigate()
const dispatch= useDispatch();
  // Prevent errors if course is not available
  if (!course) {
    return null
  }

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    studentsEnroled = [],
    instructions = [],
  } = course

  // Check whether current user is enrolled
  const isEnrolled =
    user && studentsEnroled.includes(user?._id)

  const handleAddToCart = () => {
    if(user && user?.acccontType===ACCOUNT_TYPE.INSTRUCTOR ){
      toast.error("You are an Instructure, you can not buy course");
      return;
    }

if(token){
  dispatch(addToCart(course));
  return;
}

setConfirmationModal({
  text1:"You are not logged in",
  text2:"Please login to add to cart",
  btn1text:"login",
  btn2Text:"cancel",
  btn1Handler:()=>navigate("/login"),
  btn2Handler:()=>setConfirmationModal(null),

})


    // Add your cart logic here
  }

  const handleCourseButton = () => {
    if (isEnrolled) {
      navigate("/dashboard/enrolled-courses")
    } else {
      handleBuyCourse()
    }
  }

const handleShare =()=>{
copy(window.location.href)
toast.success("Link Copied to clipboard")

}



  return (
    <div className="flex flex-col gap-4 rounded-xl bg-richblack-700 p-4">
      
      {/* Course Thumbnail */}
      <img
        src={ThumbnailImage}
        alt={course?.courseName || "Course thumbnail"}
        className="max-h-[300px] min-h-[180px] w-full rounded-xl object-cover"
      />

      {/* Course Price */}
      <div className="text-3xl font-semibold text-richblack-5">
        {`Rs. ${CurrentPrice ?? 0}`}
      </div>

      {/* Buy / Go To Course Button */}
      <button
  onClick={handleCourseButton}
  className="w-full rounded-md bg-yellow-400 py-3 font-semibold text-black hover:bg-yellow-300 transition-all duration-200"
>
  {isEnrolled ? "Go to Course" : "Buy Now"}
</button>

      {/* Add To Cart */}
      {!isEnrolled && (
        <button
          onClick={handleAddToCart}
          className="w-full rounded-md bg-blue-500 py-3 font-semibold text-black hover:bg-yellow-300 transition-all duration-200"
        >
          Add to Cart
        </button>
      )}

      {/* Guarantee */}
      <div className="text-center text-sm text-richblack-5">
        <p>30-Day Money-Back Guarantee</p>
      </div>

      {/* Course Includes */}
      <div>
        <p className="mb-3 text-lg font-semibold text-richblack-5">
          This Course Includes:
        </p>

        <div className="flex flex-col gap-y-3">
          {instructions.map((item, index) => (
            <p
              key={index}
              className="flex gap-2 text-sm text-richblack-5"
            >
              <span>•</span>
              <span>{item}</span>
            </p>
          ))}
        </div>

<button className="mx-auto h-1 mt-5 rounded-md bg-blue-500 flex items-center gap-2 p-6 text-yellow-25 text-2xl cursor-pointer" onClick={handleShare}>
 <span><FaShareSquare/></span> Share
</button>


      </div>
    </div>
  )
}

export default CourseDetailsCard