import React, { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/opertions/authAPI";
import { useNavigate, Link } from "react-router-dom";

const verifyEmail = () => {
  const { loading, signupData } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="min-h-screen bg-richblack-900 flex items-center justify-center px-4">
      {loading ? (
        <div className="flex items-center justify-center">
          <ImSpinner9 className="animate-spin text-5xl text-yellow-50" />
        </div>
      ) : (
        <div className="w-full max-w-md rounded-xl bg-richblack-800 p-6 shadow-lg sm:p-8">
          
          {/* Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-semibold text-richblack-5">
              Verify Email
            </h1>

            <p className="mt-2 text-sm leading-6 text-richblack-300">
              A verification code has been sent to your email.
              <br />
              Enter the code below to verify your account.
            </p>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleOnSubmit}>
            <div className="flex justify-center">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                shouldAutoFocus
                renderInput={(props) => (
                  <input
                    {...props}
                    className="!h-12 !w-10 rounded-lg border border-richblack-600 bg-richblack-700 text-center text-lg font-semibold text-richblack-5 outline-none transition-all focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 sm:!h-14 sm:!w-12"
                  />
                )}
                containerStyle="flex gap-2 sm:gap-3"
              />
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={otp.length !== 6}
              className="mt-8 w-full rounded-lg bg-yellow-50 py-3 font-semibold text-richblack-900 transition-all duration-200 hover:scale-[0.99] hover:bg-yellow-100 disabled:cursor-not-allowed disabled:bg-richblack-600 disabled:text-richblack-300"
            >
              Verify Email
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-richblack-200 transition-colors hover:text-yellow-50 sm:text-base"
            >
              ← Back to Login
            </Link>
          </div>

          {/* Resend OTP */}
          <div className="mt-4 text-center">
            <span className="text-sm text-richblack-400">
              Didn't receive the code?{" "}
            </span>

            <button
              type="button"
              onClick={() => dispatch(sendOtp(signupData.email))}
              className="text-sm font-semibold text-yellow-50 transition-colors hover:text-yellow-100 cursor-pointer"
            >
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default verifyEmail;