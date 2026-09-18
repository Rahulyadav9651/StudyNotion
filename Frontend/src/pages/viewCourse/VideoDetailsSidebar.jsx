import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector } from "react-redux";

import IconBtn from "../../components/common/IconBtn";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videobarActive, setVideoBarActive] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLecture,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    if (!courseSectionData?.length) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );

    if (currentSectionIndex === -1) return;

    const currentSection = courseSectionData[currentSectionIndex];

    const currentSubSectionIndex = currentSection?.subSection?.findIndex(
      (subSection) => subSection._id === subSectionId
    );

    const activeSubSectionId =
      currentSection?.subSection?.[currentSubSectionIndex]?._id;

    setActiveStatus(currentSection?._id);
    setVideoBarActive(activeSubSectionId || "");
  }, [courseSectionData, sectionId, subSectionId, location.pathname]);

  const handleSectionClick = (sectionId) => {
    setActiveStatus((prev) => (prev === sectionId ? "" : sectionId));
  };

  return (
    <div className="flex h-full flex-col bg-richblack-800 text-white">
      {/* Header */}
      <div className="border-b border-richblack-700 p-4 sm:p-5">
        {/* Back Button */}
        <div
          onClick={() => navigate("/dashboard/enrolled-courses")}
          className="mb-4 flex cursor-pointer items-center gap-2 text-richblack-200 transition hover:text-yellow-50"
        >
          <IoArrowBackCircleSharp className="text-3xl" />

          <span className="text-sm font-medium">
            Back to Courses
          </span>
        </div>

        {/* Course Information */}
        <div className="space-y-3">
          <h2 className="line-clamp-2 text-lg font-semibold text-richblack-5">
            {courseEntireData?.courseName || "Course"}
          </h2>

          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-richblack-300">
              {completedLecture?.length || 0} /{" "}
              {totalNoOfLectures || 0} lectures completed
            </p>

            <div className="shrink-0">
              <IconBtn
                text="Add Review"
                onClick={() => setReviewModal(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        {courseSectionData?.map((section, index) => {
          const isActiveSection = activeStatus === section?._id;

          return (
            <div
              key={section?._id || index}
              className="border-b border-richblack-700"
            >
              {/* Section Header */}
              <button
                type="button"
                onClick={() => handleSectionClick(section?._id)}
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  gap-3
                  px-4
                  py-4
                  text-left
                  transition
                  hover:bg-richblack-700
                  sm:px-5
                "
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-richblack-5">
                    Section {index + 1}
                  </p>

                  <p className="mt-1 truncate text-sm text-richblack-200">
                    {section?.sectionName}
                  </p>
                </div>

                <IoIosArrowDropdown
                  className={`shrink-0 text-xl transition-transform duration-200 ${
                    isActiveSection ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Subsections */}
              {isActiveSection && (
                <div className="bg-richblack-900">
                  {section?.subSection?.length > 0 ? (
                    section.subSection.map((topic, topicIndex) => {
                      const isActiveVideo =
                        videobarActive === topic?._id;

                      const isCompleted =
                        completedLecture?.includes(topic?._id);

                      return (
                        <div
                          key={topic?._id || topicIndex}
                          onClick={() => {
                            navigate(
                              `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                            );

                            setVideoBarActive(topic?._id);
                          }}
                          className={`
                            flex
                            cursor-pointer
                            items-start
                            gap-3
                            px-4
                            py-3
                            transition
                            sm:px-5
                            ${
                              isActiveVideo
                                ? "bg-yellow-200 text-richblack-900"
                                : "text-richblack-100 hover:bg-richblack-700"
                            }
                          `}
                        >
                          {/* Checkbox */}
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            readOnly
                            className="
                              mt-1
                              h-4
                              w-4
                              shrink-0
                              cursor-pointer
                              accent-yellow-400
                            "
                          />

                          {/* Lecture Information */}
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-richblack-400">
                              Lecture {topicIndex + 1}
                            </p>

                            <p
                              className={`mt-1 text-sm ${
                                isActiveVideo
                                  ? "font-semibold"
                                  : "font-medium"
                              }`}
                            >
                              {topic?.title}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="px-5 py-4 text-sm text-richblack-400">
                      No lectures available.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;