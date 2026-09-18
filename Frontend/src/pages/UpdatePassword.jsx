
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImSpinner9 } from 'react-icons/im';
import { IoEyeOff } from 'react-icons/io5';
import { GiBleedingEye } from 'react-icons/gi';
import { Link, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/opertions/authAPI';

const UpdatePassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const { password, confirmPassword } = formData;

  const changeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    const token = location.pathname.split('/').at(-1);

    dispatch(resetPassword(password, confirmPassword, token));
  }

  return (
    <div className="min-h-screen bg-richblack-900 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex items-center justify-center">
          <ImSpinner9 className="animate-spin text-4xl sm:text-5xl text-yellow-50" />
        </div>
      ) : (
        <div className="w-full max-w-md rounded-2xl bg-richblack-800 p-6 shadow-2xl sm:p-8 lg:p-10">

          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-2xl font-semibold text-richblack-5 sm:text-3xl">
              Choose New Password
            </h1>

            <p className="mt-3 text-sm leading-6 text-richblack-300 sm:text-base">
              Almost done! Enter your new password and you're all set.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* New Password */}
            <label className="block">
              <p className="mb-2 text-sm font-medium text-richblack-5 sm:text-base">
                New Password <sup className="text-pink-200">*</sup>
              </p>

              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={changeHandler}
                  placeholder="Enter new password"
                  className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 pr-12 text-sm text-richblack-5 outline-none transition-all duration-200 placeholder:text-richblack-400 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 sm:text-base"
                />

                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-richblack-200 transition-colors hover:text-yellow-50"
                >
                  {showPassword ? (
                    <IoEyeOff size={22} />
                  ) : (
                    <GiBleedingEye size={22} />
                  )}
                </span>
              </div>
            </label>

            {/* Confirm Password */}
            <label className="block">
              <p className="mb-2 text-sm font-medium text-richblack-5 sm:text-base">
                Confirm New Password{' '}
                <sup className="text-pink-200">*</sup>
              </p>

              <div className="relative">
                <input
                  required
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={changeHandler}
                  placeholder="Confirm new password"
                  className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 pr-12 text-sm text-richblack-5 outline-none transition-all duration-200 placeholder:text-richblack-400 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 sm:text-base"
                />

                <span
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-richblack-200 transition-colors hover:text-yellow-50"
                >
                  {showConfirmPassword ? (
                    <IoEyeOff size={22} />
                  ) : (
                    <GiBleedingEye size={22} />
                  )}
                </span>
              </div>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-yellow-50 px-4 py-3 text-sm font-semibold text-richblack-900 transition-all duration-200 hover:bg-yellow-100 active:scale-[0.98] sm:text-base"
            >
              Reset Password
            </button>

            {/* Back to Login */}
            <div className="text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-richblack-200 transition-colors hover:text-yellow-50 sm:text-base"
              >
                ← Back to Login
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
