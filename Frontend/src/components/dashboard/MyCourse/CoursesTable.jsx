import { HiOutlineCurrencyRupee } from "react-icons/hi"

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { COURSE_STATUS } from "../../../utils/constants";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../services/opertions/courseDetailsAPI";
import { setCourse } from "../../../slices/courseSlice";

// Import your modal component
 import ConfirmationModal from '../../common/confirmationModel';
import { useNavigate } from "react-router-dom";

const CoursesTable = ({ courses, setCourses }) => {
  const dispatch = useDispatch();
const navigate= useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleCourseDelete = async (courseId) => {
    setLoading(true);

    await deleteCourse({ courseId }, token);

    const result = await fetchInstructorCourses(token);

    if (result) {
      dispatch(setCourse(result));
      setCourses(result);
    }

    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-richblack-700">
      <Table className="w-full">
        <Thead className="bg-richblack-800">
          <Tr>
            <Th className="px-6 py-4 text-left text-sm font-semibold text-richblack-5">
              Courses
            </Th>

            <Th className="px-6 py-4 text-left text-sm font-semibold text-richblack-5">
              Duration
            </Th>

            <Th className="px-6 py-4 text-left text-sm font-semibold text-richblack-5">
              Price
            </Th>

            <Th className="px-6 py-4 text-left text-sm font-semibold text-richblack-5">
              Actions
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td
                colSpan={4}
                className="px-6 py-10 text-center text-richblack-300"
              >
                No courses found
              </Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr
                key={course._id}
                className="border-b border-richblack-700"
              >
                {/* Course */}
                <Td className="px-6 py-5">
                  <div className="flex min-w-[300px] gap-x-4">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-[80px] w-[120px] rounded-lg object-cover"
                    />

                    <div className="flex flex-col gap-y-1">
                      <p className="font-semibold text-richblack-5">
                        {course.courseName}
                      </p>

                      <p className="max-w-[300px] text-sm text-richblack-300">
                        {course.courseDescription}
                      </p>

                      <p className="text-xs text-richblack-400">
                        Created:{" "}
                        {new Date(course.createdAt).toLocaleDateString()}
                      </p>

                      {course.status === COURSE_STATUS.DRAFT ? (
                        <p className="text-sm text-pink-400">Drafted</p>
                      ) : (
                        <p className="text-sm text-yellow-25">Published</p>
                      )}
                    </div>
                  </div>
                </Td>

                {/* Duration */}
                <Td className="px-6 py-5 text-sm text-richblack-300">
                  2hr 30min
                </Td>

                {/* Price */}
                <Td className="px-6 py-5 font-medium text-richblack-5 flex gap-1.5">
                <HiOutlineCurrencyRupee className="text-2xl"/>{course.price}
                </Td>

                {/* Actions */}
                <Td className="px-6 py-5">
                  <div className="flex items-center gap-x-3">
                    <button
                      type="button"
                      onClick={()=>{navigate(`/dashboard/edit-course/${course._id}`)}}
                      disabled={loading}
                      className="rounded-md bg-yellow-50 px-4 py-2 text-sm font-medium text-richblack-900 transition hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      EDIT
                    </button>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2:
                            "All the data related to this course will be deleted.",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",

                          btn1Handler: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},

                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        })
                      }
                      className="rounded-md p-2 text-red-400 transition hover:bg-richblack-700 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <RiDeleteBin5Fill size={20} />
                    </button>
                  </div>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {/* Confirmation Modal */}
      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </div>
  );
};

export default CoursesTable;
