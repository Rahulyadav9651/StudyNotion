
import React from "react";
import { useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { BuyCourse } from "../../../services/opertions/studentFeature";
//import User from "../../../../../Backend/models/User";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);
const navigate= useNavigate();
const dispatch= useDispatch();
const {token}= useSelector((state)=>state.auth);
const {user}= useSelector((state)=>state.profile);

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    //console.log("Bought these course:", courses);
BuyCourse(token,courses,user,navigate,dispatch)


    //TODO: API integrate -> payment gateway tak leke jaegi
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-richblack-700 bg-richblack-800 p-6">
      <p className="text-sm text-richblack-300">
        Total:
      </p>

      <p className="text-3xl font-semibold text-yellow-50">
        Rs {total}
      </p>

 <IconBtn
  text="Buy Now"
  onclick={handleBuyCourse}
  className="w-full justify-center bg-blue-600 border border-blue-400 text-white hover:bg-blue-700"
/>
    </div>
  );
};

export default RenderTotalAmount

