import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import ReactMarkdown from "react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../../components/common/confirmationModel"
import Footer from "../../components/common/Footer"
import RatingStars from "../../components/common/RatingStars"
import CourseAccordionBar from "../../components/dashboard/MyCourse/CourseAccordionBar"
import CourseDetailsCard from "../../components/dashboard/MyCourse/CourseDetailsCard"

import { formatDate } from "../../services/formDate"
import { fetchCourseDetails } from "../../services/opertions/courseDetailsAPI"
import { BuyCourse } from "../../services/opertions/studentFeature"
import GetAvgRating from "../../utils/avgRating"

function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Getting courseId from URL parameter
  const { courseId } = useParams()

  // State to store course details
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  // Fetch course details
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetchCourseDetails(courseId)

        console.log("Course Details Response:", res)

        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details", error)
      }
    })()
  }, [courseId])

  // Get course object from API response
  const course = response?.data?.[0]

  console.log("Course:", course)

  // Calculate average review
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews ?? [])
    setAvgReviewCount(count)
  }, [course])

  // Collapse / expand sections
  const [isActive, setIsActive] = useState([])

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    )
  }

  // Total number of lectures
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)

  useEffect(() => {
    let lectures = 0

    course?.courseContent?.forEach((sec) => {
      lectures += sec?.subSection?.length || 0
    })

    setTotalNoOfLectures(lectures)
  }, [course])

  // Loading state
  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  // If API didn't return course
  if (!course) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center text-white">
        <p>Course details not found.</p>
      </div>
    )
  }

  // Destructure course details
  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent = [],
    ratingAndReviews = [],
    instructor,
    studentsEnroled = [],
    createdAt,
    totalDuration,
  } = course

  // Buy course
  const handleBuyCourse = () => {
    if (token) {
      BuyCourse(token, [courseId], user, navigate, dispatch)
      return
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  // Payment loading
  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <div className="relative w-full bg-richblack-800">
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            
            {/* Mobile Thumbnail */}
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>

              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>

            {/* Course Information */}
            <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5">
              
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {courseName}
                </p>
              </div>

              <p className="text-richblack-200">
                {courseDescription}
              </p>

              {/* Rating / Students */}
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">
                  {avgReviewCount}
                </span>

                <RatingStars
                  Review_Count={avgReviewCount}
                  Star_Size={24}
                />

                <span>
                  {`(${ratingAndReviews?.length ?? 0} reviews)`}
                </span>

                <span>
                  {`${studentsEnroled?.length ?? 0} students enrolled`}
                </span>
              </div>

              {/* Instructor */}
              <div>
                <p>
                  {`Created By ${instructor?.firstName ?? ""} ${
                    instructor?.lastName ?? ""
                  }`}
                </p>
              </div>

              {/* Created Date / Language */}
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  <BiInfoCircle />
                  {`Created at ${formatDate(createdAt)}`}
                </p>

                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt />
                  English
                </p>
              </div>
            </div>

            {/* Mobile Course Card */}
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                {`Rs. ${price}`}
              </p>

              <button
                className="yellowButton"
                onClick={handleBuyCourse}
              >
                Buy Now
              </button>

              <button className="blackButton">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Course Details Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
            <CourseDetailsCard
              course={course}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      {/* Main Course Details */}
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">

          {/* What You'll Learn */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">
              What you'll learn
            </p>

            <div className="mt-5">
              <ReactMarkdown>
                {whatYouWillLearn ?? ""}
              </ReactMarkdown>
            </div>
          </div>

          {/* Course Content */}
          <div className="max-w-[830px]">
            <div className="flex flex-col gap-3">

              <p className="text-[28px] font-semibold">
                Course Content
              </p>

              <div className="flex flex-wrap justify-between gap-2">

                <div className="flex gap-2">
                  
                  {/* Sections */}
                  <span>
                    {`${courseContent?.length ?? 0} section(s)`}
                  </span>

                  {/* Lectures */}
                  <span>
                    {`${totalNoOfLectures} lecture(s)`}
                  </span>

                  {/* Duration */}
                  <span>
                    {`${totalDuration ?? 0} total length`}
                  </span>

                </div>

                {/* Collapse All */}
                <div>
                  <button
                    className="text-yellow-25"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>

              </div>
            </div>

            {/* Course Accordion */}
            <div className="py-4">
              {courseContent?.map((courseSection, index) => (
                <CourseAccordionBar
                  course={courseSection}
                  key={courseSection?._id || index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-4">

              <p className="text-[28px] font-semibold">
                Author
              </p>

              <div className="flex items-center gap-4 py-4">

                {/* Instructor Image */}
                <img
                  src={
                    instructor?.image ||
                    `https://api.dicebear.com/5.x/initials/svg?seed=${
                      instructor?.firstName ?? ""
                    } ${instructor?.lastName ?? ""}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />

                {/* Instructor Name */}
                <p className="text-lg">
                  {`${instructor?.firstName ?? ""} ${
                    instructor?.lastName ?? ""
                  }`}
                </p>

              </div>

              {/* Instructor About */}
              <p className="text-richblack-50">
                {instructor?.additionalDetails?.about ?? ""}
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Confirmation Modal */}
      {confirmationModal && (
        <ConfirmationModal
          modalData={confirmationModal}
        />
      )}
    </>
  )
}

export default CourseDetails