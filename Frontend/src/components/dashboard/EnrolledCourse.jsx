
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../services/opertions/profileAPI";
import { ImSpinner9 } from "react-icons/im";
//import ProgressBar from "@ramonak/react-progress-bar";
//import ProgressBar from "@ramonak/react-progress-bar";

import progressBarPkg from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";
const ProgressBar = progressBarPkg.ProgressBar || progressBarPkg.default;

const EnrolledCourse = () => {
  const { token } = useSelector((state) => state.auth);
const navigate= useNavigate();
  const [enrolledCourse, setEnrolledCourse] = useState(null);

  const getEnrolledCourse = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourse(response);
    } catch (error) {
      console.log("Unable to fetch Course", error);
      setEnrolledCourse([]);
    }
  };

  useEffect(() => {
    if (token) {
      getEnrolledCourse();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-richblack-900 px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-richblack-5">
            Enrolled Courses
          </h1>

          <p className="mt-2 text-sm text-richblack-300">
            Continue learning and track your progress.
          </p>
        </div>

        {/* Loading */}
        {!enrolledCourse ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <ImSpinner9 className="animate-spin text-4xl text-yellow-50" />
          </div>
        ) : enrolledCourse.length === 0 ? (

          /* No courses */
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-richblack-700 bg-richblack-800 px-6 text-center">
            <div className="mb-4 text-5xl">📚</div>

            <h2 className="text-xl font-semibold text-richblack-5">
              No Courses Enrolled
            </h2>

            <p className="mt-2 max-w-md text-sm text-richblack-300">
              You haven't enrolled in any courses yet. Explore our courses
              and start learning today.
            </p>
          </div>
        ) : (

          /* Courses */
          <div className="space-y-4">

            {/* Table Header */}
            <div className="hidden grid-cols-[2fr_1fr_1fr] gap-6 rounded-lg border-b border-richblack-700 bg-richblack-800 px-6 py-4 text-sm font-medium text-richblack-300 md:grid">
              <p>Course Name</p>
              <p>Duration</p>
              <p>Progress</p>
            </div>

            {enrolledCourse.map((course, index) => {
              const progress = course.progressPercentage || 0;

              return (

console.log("course",course),
                <div
                  key={course._id || index}
                  className="grid gap-5 rounded-xl border border-richblack-700 bg-richblack-800 p-4 shadow-md transition-all duration-200 hover:border-richblack-500 hover:shadow-lg md:grid-cols-[2fr_1fr_1fr] md:items-center md:gap-6 md:p-6 cursor-pointer"
                  onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
                >





                  
                  {/* Course Information */}
                  <div className="flex gap-4">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-24 w-36 rounded-lg object-cover"
                    />

                    <div className="min-w-0">
                      <h2 className="line-clamp-1 text-lg font-semibold text-richblack-5">
                        {course.courseName}
                      </h2>

                      <p className="mt-2 line-clamp-2 text-sm text-richblack-300">
                        {course.courseDescription}
                      </p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <p className="mb-1 text-xs text-richblack-400 md:hidden">
                      Duration
                    </p>

                    <p className="text-sm font-medium text-richblack-100">
                      {course.totalDuration || "N/A"}
                    </p>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs text-richblack-400">
                        Progress
                      </p>

                      <p className="text-sm font-semibold text-yellow-50">
                        {progress}%
                      </p>
                    </div>

                    <ProgressBar
                      completed={progress}
                      height="8px"
                      labelVisible={false}
                      bgColor="#FFD60A"
                      baseBgColor="#2C333F"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourse;

