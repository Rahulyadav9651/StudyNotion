
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/opertions/authAPI';
import { ImSpinner9 } from "react-icons/im";
const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-richblack-900 px-4 py-8 sm:px-6 lg:px-8">

      {loading ? (
      <ImSpinner9 className="animate-spin text-4xl text-yellow-50" />
      ) : (
        <div className="w-full max-w-md rounded-2xl bg-richblack-800 p-6 shadow-2xl sm:p-8">

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-richblack-5 sm:text-3xl">
              {!emailSent ? 'Reset Your Password' : 'Check Your Email'}
            </h1>

            <p className="mt-3 text-sm leading-6 text-richblack-300 sm:text-base">
              {!emailSent
                ? 'Have no fear. We will email you instructions to reset your password. If you don’t have access to your email, we can try account recovery.'
                : `We have sent a reset email to ${email}`}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleOnSubmit} className="space-y-5">

            {!emailSent && (
              <label className="block">
                <p className="mb-2 text-sm font-medium text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>

                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-sm text-richblack-5 outline-none transition-all duration-200 placeholder:text-richblack-400 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 sm:text-base"
                />
              </label>
            )}

            {/* Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-yellow-50 px-4 py-3 text-sm font-semibold text-richblack-900 transition-all duration-200 hover:bg-yellow-100 active:scale-[0.98] sm:text-base"
            >
              {!emailSent ? 'Reset Password' : 'Resend Email'}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-richblack-200 transition-colors hover:text-yellow-50"
            >
              ← Back to Login
            </Link>
          </div>

        </div>
      )}
    </div>
  );
};

export default ForgotPassword;

