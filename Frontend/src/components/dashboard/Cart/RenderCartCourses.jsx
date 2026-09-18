
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../slices/cartSlice";
//import ReactStars from "react-rating-stars-component";
//import ReactStars from "react-rating-stars-component";
const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="w-full">
      {cart.map((course, index) => (
        <div
          key={course?._id || index}
          className="flex flex-col gap-6 border-b border-richblack-700 py-6 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex gap-5">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="h-24 w-36 rounded-lg object-cover"
            />

            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold text-white">
                {course?.courseName}
              </p>

              <p className="text-sm text-richblack-300">
                {course?.category?.name}
              </p>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-yellow-50">
                  4.8
                </span>

                {/* <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                /> */}
<div className="flex">
  {[1, 2, 3, 4, 5].map((star) => (
    <GiNinjaStar
      key={star}
      className="text-yellow-400"
      size={20}
    />
  ))}
</div>



                <span className="text-sm text-richblack-300">
                  {course?.ratingAndReviews?.length || 0} Ratings
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 md:flex-col md:items-end">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-2 text-sm font-medium text-pink-200 transition-all duration-200 hover:text-pink-100"
            >
              <RiDeleteBin6Line className="text-lg" />
              <span>Remove</span>
            </button>

            <p className="text-lg font-semibold text-yellow-50">
              Rs {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourses;


