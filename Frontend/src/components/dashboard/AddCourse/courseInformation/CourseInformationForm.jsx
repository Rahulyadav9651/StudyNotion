import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../services/opertions/courseDetailsAPI"
import { setCourse, setStep } from "../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../utils/constants"

import IconBtn from "../../../common/IconBtn"
import Upload from "./Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if (categories.length > 0) {
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    if (editCourse) {
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)
    setLoading(true)
    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl border border-gradient-to-r from-pink-500/20 to-blue-500/20 bg-gradient-to-br from-richblack-800 via-richblack-800 to-richblack-700 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-3xl"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-3 group">
        <label className="text-sm font-semibold text-richblack-5 tracking-wide group-focus-within:text-pink-300 transition-colors" htmlFor="courseTitle">
          Course Title <sup className="text-pink-300 font-bold">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="w-full px-4 py-3 rounded-lg bg-richblack-700 border-2 border-richblack-600 text-richblack-5 placeholder-richblack-400 transition-all duration-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 focus:shadow-lg focus:shadow-pink-500/20 hover:border-richblack-500"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-300 font-medium animate-pulse">
            Course title is required
          </span>
        )}
      </div>

      {/* Course Short Description */}
      <div className="flex flex-col space-y-3 group">
        <label className="text-sm font-semibold text-richblack-5 tracking-wide group-focus-within:text-pink-300 transition-colors" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-300 font-bold">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="resize-x-none min-h-[130px] w-full px-4 py-3 rounded-lg bg-richblack-700 border-2 border-richblack-600 text-richblack-5 placeholder-richblack-400 transition-all duration-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 focus:shadow-lg focus:shadow-pink-500/20 hover:border-richblack-500"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-300 font-medium animate-pulse">
            Course Description is required
          </span>
        )}
      </div>



      {/* Course Price */}
      <div className="flex flex-col space-y-3 group">
        <label className="text-sm font-semibold text-richblack-5 tracking-wide group-focus-within:text-pink-300 transition-colors" htmlFor="coursePrice">
          Course Price <sup className="text-pink-300 font-bold">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="w-full px-4 py-3 pl-12 rounded-lg bg-richblack-700 border-2 border-richblack-600 text-richblack-5 placeholder-richblack-400 transition-all duration-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 focus:shadow-lg focus:shadow-pink-500/20 hover:border-richblack-500"
          />
          <HiOutlineCurrencyRupee className="absolute left-4 top-1/2 inline-block -translate-y-1/2 text-2xl text-pink-300 transition-colors duration-200" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-300 font-medium animate-pulse">
            Course Price is required
          </span>
        )}
      </div>



      {/* Course Category */}
      <div className="flex flex-col space-y-3 group">
        <label className="text-sm font-semibold text-richblack-5 tracking-wide group-focus-within:text-pink-300 transition-colors" htmlFor="courseCategory">
          Course Category <sup className="text-pink-300 font-bold">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="w-full px-4 py-3 rounded-lg bg-richblack-700 border-2 border-richblack-600 text-richblack-5 transition-all duration-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 focus:shadow-lg focus:shadow-pink-500/20 hover:border-richblack-500 appearance-none cursor-pointer"
        >
          <option value="" disabled className="bg-richblack-700">
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id} className="bg-richblack-700">
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-300 font-medium animate-pulse">
            Course Category is required
          </span>
        )}
      </div>

      {/* Course Tags */}
      <div className="transform transition-all duration-300">
        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter Tags and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
      </div>

      {/* Course Thumbnail Image */}
      <div className="transform transition-all duration-300">
        <Upload
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />
      </div>

      {/* Benefits of the course */}
      <div className="flex flex-col space-y-3 group">
        <label className="text-sm font-semibold text-richblack-5 tracking-wide group-focus-within:text-pink-300 transition-colors" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-300 font-bold">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="resize-x-none min-h-[130px] w-full px-4 py-3 rounded-lg bg-richblack-700 border-2 border-richblack-600 text-richblack-5 placeholder-richblack-400 transition-all duration-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 focus:shadow-lg focus:shadow-pink-500/20 hover:border-richblack-500"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-300 font-medium animate-pulse">
            Benefits of the course is required
          </span>
        )}
      </div>

      {/* Requirements/Instructions */}
      <div className="transform transition-all duration-300">
        <RequirementsField
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
        />
      </div>

      {/* Next Button */}
      <div className="flex justify-end gap-x-3 pt-6 border-t border-richblack-700">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="flex cursor-pointer items-center gap-x-2 rounded-lg bg-richblack-700 py-2.5 px-6 font-semibold text-richblack-5 border border-richblack-600 transition-all duration-200 hover:bg-richblack-600 hover:border-richblack-500 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn disabled={loading} text={!editCourse ? "Next" : "Save Changes"} > <span className="flex items-center text-xl"> <MdNavigateNext /> </span> </IconBtn>
      </div>
    </form>
  )
}