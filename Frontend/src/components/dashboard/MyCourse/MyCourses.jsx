
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/opertions/courseDetailsAPI';
import IconBtn from '../../common/IconBtn';
import CoursesTable from './CoursesTable';

const MyCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await fetchInstructorCourses(token);

            if (result) {
                setCourses(result);
            }
        };

        if (token) {
            fetchCourses();
        }
    }, [token]);

    return (
        <div className="min-h-screen bg-richblack-900 px-4 py-6 text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    {/* Title */}
                    <div>
                        <h1 className="text-2xl font-bold text-richblack-5 sm:text-3xl">
                            My Courses
                        </h1>

                        <p className="mt-1 text-sm text-richblack-300">
                            Manage and track all your courses
                        </p>
                    </div>

                    {/* Add Course Button */}
                    
<div className="w-full sm:w-auto">
    <IconBtn
        text="Add Course +"
        onclick={() => navigate("/dashboard/add-course")}
        customClasses="
            w-full sm:w-auto
            rounded-lg
            border-2 border-yellow-400
            bg-yellow-50
            px-5 py-3
            font-semibold
            text-richblack-900
            shadow-md
            transition-all duration-200
            hover:bg-yellow-100
            hover:border-yellow-300
            hover:shadow-lg
            active:scale-95
        "
    />
</div>




                </div>

                {/* Courses */}
                <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-3 shadow-md sm:p-5">

                    {courses && courses.length > 0 ? (
                        <div className="overflow-x-auto">
                            <CoursesTable
                                courses={courses}
                                setCourses={setCourses}
                            />
                        </div>
                    ) : (
                        <div className="flex min-h-[250px] flex-col items-center justify-center px-4 text-center">
                            <h2 className="text-lg font-semibold text-richblack-100 sm:text-xl">
                                No courses found
                            </h2>

                            <p className="mt-2 text-sm text-richblack-300">
                                You haven't created any courses yet.
                            </p>

                            <button
                                onClick={() => navigate('/dashboard/add-course')}
                                className="mt-5 rounded-md bg-yellow-50 px-5 py-2.5 text-sm font-semibold text-richblack-900 transition-all duration-200 hover:scale-95"
                            >
                                Create Your First Course
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default MyCourses;
