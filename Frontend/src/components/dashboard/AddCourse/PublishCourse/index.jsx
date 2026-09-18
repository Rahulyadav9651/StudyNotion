import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

import IconBtn from "../../../common/IconBtn"
import {
  resetCourseState,
  setStep,
} from "../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../utils/constants"
import { editCourseDetails } from "../../../../services/opertions/courseDetailsAPI"

const PublishCourse = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm()

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  const goBack = () => {
    dispatch(setStep(2))
  }

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [course, setValue])

  const goToCourses = () => {
    dispatch(resetCourseState())
  }

  const handleCoursePublish = async () => {
    const isPublic = getValues("public")

    // If course is already published and checkbox is still checked
    // OR course is draft and checkbox is unchecked
    if (
      (course?.status === COURSE_STATUS.PUBLISHED && isPublic === true) ||
      (course?.status === COURSE_STATUS.DRAFT && isPublic === false)
    ) {
      goToCourses()
      return
    }

    const formData = new FormData()

    formData.append("courseId", course._id)

    const courseStatus = isPublic
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT

    formData.append("status", courseStatus)

    setLoading(true)

    const result = await editCourseDetails(formData, token)

    if (result) {
      goToCourses()
    }

    setLoading(false)
  }

  const onSubmit = () => {
    handleCoursePublish()
  }

  return (
    <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-6 text-2xl font-semibold text-richblack-5">
        Publish Course
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-richblack-5">
            Make this course public
          </p>

          <label
            htmlFor="public"
            className="flex cursor-pointer items-center gap-2"
          >
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="h-4 w-4 rounded border-richblack-500 bg-richblack-700 text-yellow-50 focus:ring-yellow-50"
            />

            <span className="text-sm text-richblack-300">
              Publish this course
            </span>
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-x-3">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex items-center rounded-md bg-richblack-300 px-5 py-2 font-semibold text-richblack-900 transition hover:bg-richblack-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>

          <IconBtn
            disabled={loading}
            text='Save Changes'
          />
        </div>
      </form>
    </div>
  )
}

export default PublishCourse