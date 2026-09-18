import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import { getFullDetailsOfCourse } from "../../services/opertions/courseDetailsAPI";

import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../../slices/viewCourseSlice";

import CourseReviewModal from "./CourseReviewModal";
import VideoDetailsSidebar from "./VideoDetailsSidebar";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);

  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      try {
        const courseData = await getFullDetailsOfCourse(courseId, token);

        dispatch(
          setCourseSectionData(courseData.courseDetails.courseContent)
        );

        dispatch(setEntireCourseData(courseData.courseDetails));

        dispatch(setCompletedLectures(courseData.completedVideos));

        let lecture = 0;

        courseData?.courseDetails?.courseContent?.forEach((section) => {
          lecture += section?.subSection?.length || 0;
        });

        dispatch(setTotalNoOfLectures(lecture));
      } catch (error) {
        console.log("Unable to fetch course details:", error);
      }
    };

    if (courseId && token) {
      setCourseSpecificDetails();
    }
  }, [courseId, token, dispatch]);

  return (
    <div className="min-h-screen bg-richblack-900 text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">

        {/* Sidebar */}
        <aside
          className="
            w-full
            border-b border-richblack-700
            bg-richblack-800
            lg:sticky lg:top-0
            lg:h-screen
            lg:w-[320px]
            lg:shrink-0
            lg:overflow-y-auto
            lg:border-b-0
            lg:border-r
          "
        >
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </aside>

        {/* Main Content */}
        <main
          className="
            min-w-0
            flex-1
            bg-richblack-900
            p-3
            sm:p-4
            md:p-6
            lg:p-8
          "
        >
          <div className="mx-auto w-full max-w-[1200px]">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Review Modal */}
      {reviewModal && (
        <CourseReviewModal setReviewModal={setReviewModal} />
      )}
    </div>
  );
};

export default ViewCourse;