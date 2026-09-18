
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import GetAvgRating from "../utils/avgRating";
import RatingStars from "../components/common/RatingStars"

const CoursesCard = ({ course, height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <Link to={`/course/${course?._id}`}>
      <div className="group w-full max-w-[400px] overflow-hidden rounded-xl bg-richblack-800 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

        {/* Course Image */}
        <div className="overflow-hidden">
          <img
            src={course?.thumbnail}
            alt={course?.courseName}
            className={`${
              height || "h-[250px]"
            } w-full object-cover transition-transform duration-300 group-hover:scale-105`}
          />
        </div>

        {/* Course Details */}
        <div className="space-y-2 p-4">

          {/* Course Name */}
          <p className="line-clamp-2 text-lg font-semibold text-white">
            {course?.courseName}
          </p>

          {/* Instructor */}
          <p className="text-sm text-richblack-300">
            {course?.instructor?.firstName}{" "}
            {course?.instructor?.lastName}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-yellow-50">
              {avgReviewCount || 0}
            </span>

            <RatingStars Review_Count={avgReviewCount} />

            <span className="text-richblack-400">
              ({course?.ratingAndReviews?.length || 0} Ratings)
            </span>
          </div>

          {/* Price */}
          <p className="pt-2 text-xl font-bold text-white">
            ₹{course?.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CoursesCard;
