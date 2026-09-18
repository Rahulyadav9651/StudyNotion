
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper/modules";

import CoursesCard from "./CoursesCard";

const CourseSlider = ({ Courses }) => {
  return (
    <div className="w-full">
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper"
        >
          {Courses.map((course, index) => (
            <SwiperSlide key={course?._id || index}>
              <CoursesCard
                course={course}
                height="h-[250px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="py-6 text-center text-richblack-300">
          No courses found
        </p>
      )}
    </div>
  );
};

export default CourseSlider;
