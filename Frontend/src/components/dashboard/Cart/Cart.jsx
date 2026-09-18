
import { useSelector } from "react-redux";

import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="min-h-screen bg-richblack-900 px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold">
          Your Cart
        </h1>

        <p className="mt-2 text-sm text-richblack-300">
          {totalItems} Courses in Cart
        </p>

        {total > 0 ? (
          <div className="mt-8 flex flex-col gap-8 lg:flex-row">
            <div className="flex-1">
              <RenderCartCourses />
            </div>

            <div className="w-full lg:w-[350px]">
              <RenderTotalAmount />
            </div>
          </div>
        ) : (
          <p className="mt-8 text-richblack-300">
            Your Cart is Empty
          </p>
        )}
      </div>
    </div>
  );
}


