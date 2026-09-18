import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Player } from "video-react";
import "video-react/dist/video-react.css";

import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdCheckmarkCircle,
  IoMdRefresh,
} from "react-icons/io";

import {
  markLectureAsComplete,
} from "../../services/opertions/courseDetailsAPI";

import {
  updateCompletedLectures,
} from "../../slices/viewCourseSlice";

import IconBtn from "../../components/common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { token } = useSelector((state) => state.auth);

  const {
    courseSectionData,
    courseEntireData,
    completedLecture,
  } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  /*
   * Get current video
   */
  useEffect(() => {
    if (!courseSectionData?.length) return;

    if (!courseId || !sectionId || !subSectionId) {
      navigate("/dashboard/enrolled-courses");
      return;
    }

    const currentSection = courseSectionData.find(
      (section) => section?._id === sectionId
    );

    if (!currentSection) {
      navigate("/dashboard/enrolled-courses");
      return;
    }

    const currentVideo = currentSection?.subSection?.find(
      (subSection) => subSection?._id === subSectionId
    );

    if (!currentVideo) {
      navigate("/dashboard/enrolled-courses");
      return;
    }

    setVideoData(currentVideo);
    setVideoEnded(false);
  }, [
    courseSectionData,
    courseId,
    sectionId,
    subSectionId,
    location.pathname,
    navigate,
  ]);

  /*
   * Find current section
   */
  const getCurrentSectionIndex = () => {
    return (
      courseSectionData?.findIndex(
        (section) => section?._id === sectionId
      ) ?? -1
    );
  };

  /*
   * Find current subsection
   */
  const getCurrentSubSectionIndex = () => {
    const sectionIndex = getCurrentSectionIndex();

    if (sectionIndex === -1) return -1;

    return (
      courseSectionData?.[sectionIndex]?.subSection?.findIndex(
        (video) => video?._id === subSectionId
      ) ?? -1
    );
  };

  /*
   * Is first video?
   */
  const isFirstVideo = () => {
    const sectionIndex = getCurrentSectionIndex();
    const subSectionIndex = getCurrentSubSectionIndex();

    return sectionIndex === 0 && subSectionIndex === 0;
  };

  /*
   * Is last video?
   */
  const isLastVideo = () => {
    const sectionIndex = getCurrentSectionIndex();
    const subSectionIndex = getCurrentSubSectionIndex();

    if (sectionIndex === -1 || subSectionIndex === -1) {
      return true;
    }

    const currentSection = courseSectionData?.[sectionIndex];

    const lastSection =
      sectionIndex === courseSectionData.length - 1;

    const lastVideo =
      subSectionIndex ===
      (currentSection?.subSection?.length || 0) - 1;

    return lastSection && lastVideo;
  };

  /*
   * Next video
   */
  const goToNextVideo = () => {
    const sectionIndex = getCurrentSectionIndex();
    const subSectionIndex = getCurrentSubSectionIndex();

    if (sectionIndex === -1 || subSectionIndex === -1) return;

    const currentSection = courseSectionData[sectionIndex];

    /*
     * Next video in same section
     */
    if (
      subSectionIndex <
      currentSection.subSection.length - 1
    ) {
      const nextVideo =
        currentSection.subSection[subSectionIndex + 1];

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextVideo._id}`
      );

      return;
    }

    /*
     * First video of next section
     */
    if (sectionIndex < courseSectionData.length - 1) {
      const nextSection =
        courseSectionData[sectionIndex + 1];

      if (!nextSection?.subSection?.length) return;

      const nextVideo = nextSection.subSection[0];

      navigate(
        `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextVideo._id}`
      );
    }
  };

  /*
   * Previous video
   */
  const goToPreviousVideo = () => {
    const sectionIndex = getCurrentSectionIndex();
    const subSectionIndex = getCurrentSubSectionIndex();

    if (sectionIndex === -1 || subSectionIndex === -1) return;

    /*
     * Previous video in same section
     */
    if (subSectionIndex > 0) {
      const previousVideo =
        courseSectionData[sectionIndex]
          .subSection[subSectionIndex - 1];

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${previousVideo._id}`
      );

      return;
    }

    /*
     * Last video of previous section
     */
    if (sectionIndex > 0) {
      const previousSection =
        courseSectionData[sectionIndex - 1];

      if (!previousSection?.subSection?.length) return;

      const previousVideo =
        previousSection.subSection[
          previousSection.subSection.length - 1
        ];

      navigate(
        `/view-course/${courseId}/section/${previousSection._id}/sub-section/${previousVideo._id}`
      );
    }
  };

  /*
   * Mark lecture completed
   */
  const handleLectureCompletion = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const response = await markLectureAsComplete(
        {
          courseId,
          subSectionId,
        },
        token
      );

      if (response) {
        dispatch(updateCompletedLectures(subSectionId));
      }
    } catch (error) {
      console.log(
        "Unable to mark lecture as completed:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Rewatch
   */
  const handleRewatch = () => {
    setVideoEnded(false);

    const videoElement =
      document.querySelector("video");

    if (videoElement) {
      videoElement.currentTime = 0;
      videoElement.play();
    }
  };

  const isCompleted =
    completedLecture?.includes(subSectionId);

  return (
    <div className="w-full">
      {!videoData ? (
        <div className="flex min-h-[400px] items-center justify-center rounded-xl bg-richblack-800">
          <p className="text-richblack-300">
            Loading video...
          </p>
        </div>
      ) : (
        <div className="w-full">
          {/* Video */}
          <div className="overflow-hidden rounded-lg border border-richblack-700 bg-black shadow-lg sm:rounded-xl">
            <Player
              aspectRatio="16:9"
              fluid
              playsInline
              src={videoData?.videoUrl}
              onEnded={() => setVideoEnded(true)}
            />
          </div>

          {/* Video Information */}
          <div className="mt-5 rounded-xl border border-richblack-700 bg-richblack-800 p-4 sm:p-6">
            <h1 className="text-xl font-semibold text-richblack-5 sm:text-2xl">
              {videoData?.title}
            </h1>

            {videoData?.description && (
              <p className="mt-3 text-sm leading-6 text-richblack-300 sm:text-base">
                {videoData.description}
              </p>
            )}
          </div>

          {/* Controls after video ends */}
          {videoEnded && (
            <div className="mt-5 rounded-xl border border-richblack-700 bg-richblack-800 p-4 sm:p-6">
              <div className="flex flex-col gap-4">

                {/* Completion */}
                {!isCompleted && (
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-richblack-5">
                        Finished this lecture?
                      </h3>

                      <p className="mt-1 text-sm text-richblack-400">
                        Mark this lecture as completed.
                      </p>
                    </div>

                    <IconBtn
                      disabled={loading}
                      onClick={handleLectureCompletion}
                      text={
                        loading
                          ? "Loading..."
                          : "Mark as completed"
                      }
                    />
                  </div>
                )}

                {/* Completed message */}
                {isCompleted && (
                  <div className="flex items-center gap-2 text-sm font-medium text-caribbeangreen-300">
                    <IoMdCheckmarkCircle className="text-xl" />

                    <span>
                      Lecture completed
                    </span>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex flex-col gap-3 border-t border-richblack-700 pt-4 sm:flex-row sm:justify-between">

                  {/* Previous */}
                  {!isFirstVideo() ? (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={goToPreviousVideo}
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        border
                        border-richblack-600
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-richblack-100
                        transition
                        hover:bg-richblack-700
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <IoIosArrowBack />

                      Previous
                    </button>
                  ) : (
                    <div />
                  )}

                  {/* Rewatch */}
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleRewatch}
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      border
                      border-richblack-600
                      px-5
                      py-2.5
                      text-sm
                      font-medium
                      text-richblack-100
                      transition
                      hover:bg-richblack-700
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <IoMdRefresh />

                    Rewatch
                  </button>

                  {/* Next */}
                  {!isLastVideo() && (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={goToNextVideo}
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        bg-yellow-50
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-richblack-900
                        transition
                        hover:bg-yellow-100
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      Next

                      <IoIosArrowForward />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoDetails;