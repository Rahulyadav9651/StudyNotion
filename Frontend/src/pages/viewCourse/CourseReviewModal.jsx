import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosCloseCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";

import IconBtn from "../../components/common/IconBtn";
import { createRating } from "../../services/opertions/courseDetailsAPI";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      await createRating(
        {
          courseId: courseEntireData?._id,
          rating: data.courseRating,
          review: data.courseExperience,
        },
        token
      );

      setReviewModal(false);
    } catch (error) {
      console.log("Unable to submit review:", error);
    }
  };

  const ratingChange = (newRating) => {
    setValue("courseRating", newRating, {
      shouldValidate: true,
    });
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/70
        px-4
        py-6
        backdrop-blur-sm
      "
      onClick={() => setReviewModal(false)}
    >
      <div
        className="
          w-full
          max-w-[550px]
          overflow-hidden
          rounded-xl
          border
          border-richblack-700
          bg-richblack-800
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-richblack-700
            px-5
            py-4
            sm:px-6
          "
        >
          <h2 className="text-lg font-semibold text-richblack-5 sm:text-xl">
            Add Review
          </h2>

          <button
            type="button"
            onClick={() => setReviewModal(false)}
            className="
              text-2xl
              text-richblack-300
              transition
              hover:text-white
            "
          >
            <IoIosCloseCircle />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6">
          {/* User Information */}
          <div className="flex items-center gap-3">
            <img
              src={user?.image}
              alt={`${user?.firstName || "User"} profile`}
              className="h-12 w-12 rounded-full object-cover"
            />

            <div>
              <p className="font-medium text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>

              <p className="text-sm text-richblack-400">
                Posting publicly
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col gap-5"
          >
            {/* Rating */}
            <div className="flex flex-col items-center">
              <p className="mb-2 text-sm font-medium text-richblack-200">
                How would you rate this course?
              </p>

              <ReactStars
                count={5}
                onChange={ratingChange}
                size={28}
                activeColor="#ffd700"
                isHalf={true}
              />

              <input
                type="hidden"
                {...register("courseRating", {
                  required: "Please provide a rating",
                  min: {
                    value: 1,
                    message: "Please select a rating",
                  },
                })}
              />

              {errors.courseRating && (
                <p className="mt-1 text-xs text-pink-200">
                  {errors.courseRating.message}
                </p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label
                htmlFor="courseExperience"
                className="mb-2 block text-sm font-medium text-richblack-5"
              >
                Add Your Experience
                <span className="text-pink-200"> *</span>
              </label>

              <textarea
                id="courseExperience"
                placeholder="Share your experience with this course..."
                {...register("courseExperience", {
                  required: "Please add your experience",
                })}
                className="
                  min-h-[130px]
                  w-full
                  resize-none
                  rounded-lg
                  border
                  border-richblack-600
                  bg-richblack-700
                  p-3
                  text-sm
                  text-richblack-5
                  outline-none
                  placeholder:text-richblack-400
                  focus:border-yellow-50
                "
              />

              {errors.courseExperience && (
                <p className="mt-1 text-xs text-pink-200">
                  {errors.courseExperience.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div
              className="
                flex
                flex-col-reverse
                gap-3
                sm:flex-row
                sm:justify-end
              "
            >
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="
                  rounded-lg
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-richblack-100
                  transition
                  hover:bg-richblack-700
                "
              >
                Cancel
              </button>

              <IconBtn text="Save" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;