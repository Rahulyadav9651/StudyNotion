import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../common/IconBtn";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const goToSettings = () => {
    navigate("/dashboard/settings");
  };

  return (
    <div className="mx-auto w-full max-w-[900px] px-4 py-6 text-white sm:px-6 lg:px-8">
      
      {/* Page Heading */}
      <h1 className="mb-8 text-2xl font-semibold text-richblack-5 sm:text-3xl">
        My Profile
      </h1>

      {/* ================= SECTION 1 ================= */}
      <div className="mb-6 rounded-xl border border-richblack-700 bg-richblack-800 p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          
          {/* Profile Info */}
          <div className="flex items-center gap-4">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="h-[78px] w-[78px] shrink-0 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-richblack-5 sm:text-xl">
                {user?.firstName} {user?.lastName}
              </p>

              <p className="mt-1 break-all text-sm text-richblack-300 sm:text-base">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <div className="w-full sm:w-auto">
            <IconBtn
              text="Edit"
              onclick={goToSettings}
            />
          </div>
        </div>
      </div>

      {/* ================= SECTION 2 ================= */}
      <div className="mb-6 rounded-xl border border-richblack-700 bg-richblack-800 p-5 sm:p-6">
        
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5 sm:text-xl">
            About
          </p>

          <IconBtn
            text="Edit"
            onclick={goToSettings}
          />
        </div>

        {/* About Content */}
        <p className="text-sm leading-6 text-richblack-300 sm:text-base">
          {user?.additionalDetails?.about ??
            "Write Something about Yourself"}
        </p>
      </div>

      {/* ================= SECTION 3 ================= */}
      <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-5 sm:p-6">
        
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5 sm:text-xl">
            Personal Details
          </p>

          <IconBtn
            text="Edit"
            onclick={goToSettings}
          />
        </div>

        {/* Personal Details Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          
          {/* First Name */}
          <div>
            <p className="mb-1 text-xs text-richblack-400 sm:text-sm">
              First Name
            </p>
            <p className="text-sm text-richblack-5 sm:text-base">
              {user?.firstName || "Not Added"}
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="mb-1 text-xs text-richblack-400 sm:text-sm">
              Email
            </p>
            <p className="break-all text-sm text-richblack-5 sm:text-base">
              {user?.email || "Not Added"}
            </p>
          </div>

          {/* Gender */}
          <div>
            <p className="mb-1 text-xs text-richblack-400 sm:text-sm">
              Gender
            </p>
            <p className="text-sm text-richblack-5 sm:text-base">
              {user?.additionalDetails?.gender ?? "Add Gender"}
            </p>
          </div>

          {/* Last Name */}
          <div>
            <p className="mb-1 text-xs text-richblack-400 sm:text-sm">
              Last Name
            </p>
            <p className="text-sm text-richblack-5 sm:text-base">
              {user?.lastName || "Not Added"}
            </p>
          </div>

          {/* Phone Number */}
          <div>
            <p className="mb-1 text-xs text-richblack-400 sm:text-sm">
              Phone Number
            </p>
            <p className="text-sm text-richblack-5 sm:text-base">
              {user?.additionalDetails?.contactNumber ??
                "Add Contact Number"}
            </p>
          </div>

          {/* Date of Birth */}
          <div>
            <p className="mb-1 text-xs text-richblack-400 sm:text-sm">
              Date of Birth
            </p>
            <p className="text-sm text-richblack-5 sm:text-base">
              {user?.additionalDetails?.dateOfBirth ??
                "Add Date of Birth"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;