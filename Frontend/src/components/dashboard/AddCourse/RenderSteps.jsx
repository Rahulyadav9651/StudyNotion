import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

import CourseBuilderForm from "./courseInformation/CourseBuilderForm";
import CourseInformationForm from "./courseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse/index";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      {/* Steps */}
      <div className="mb-10 flex w-full items-center justify-center">
        {steps.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold ${
                  step >= item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                }`}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </div>

              <p
                className={`mt-2 text-sm ${
                  step >= item.id
                    ? "text-yellow-50"
                    : "text-richblack-300"
                }`}
              >
                {item.title}
              </p>
            </div>

            {index !== steps.length - 1 && (
              <div className="mx-3 h-[2px] w-16 bg-richblack-700 md:w-24">
                <div
                  className={`h-full ${
                    step > item.id
                      ? "bg-yellow-50"
                      : "bg-richblack-700"
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Forms */}
      <div>
        {step === 1 && <CourseInformationForm />}

        {step === 2 && <CourseBuilderForm />}

        {step === 3 && <PublishCourse />}
      </div>
    </>
  );
};

export default RenderSteps;