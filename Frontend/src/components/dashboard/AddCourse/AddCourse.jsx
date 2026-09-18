import React from "react";
import RenderSteps from "./RenderSteps";

const AddCourse = () => {
  return (
    <div className="mx-auto flex w-11/12 max-w-[1200px] flex-row gap-10 text-white">
      {/* Main Content */}
      <div className="w-[70%]">
        <h1 className="text-3xl font-semibold">Add Course</h1>

        <div className="mt-6">
          <RenderSteps />
        </div>
      </div>

      {/* Tips */}
      <div className="mt-12 h-fit w-[30%] rounded-md bg-richblack-800 p-6">
        <p className="mb-4 text-xl font-semibold">Course Upload Tips</p>

        <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-richblack-300">
          <li>Set the course price option or make it free.</li>
          <li>Standard size for course thumbnail is 1024 × 576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Make sure all required course information is completed.</li>
        </ul>
      </div>
    </div>
  );
};

export default AddCourse;