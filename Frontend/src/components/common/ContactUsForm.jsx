import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";
import CountryCode from "../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  // Reset form after successful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
        countryCode: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  // Submit form
  const submitContactForm = async (data) => {
    try {
      setLoading(true);

      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );

      console.log("Contact Form Response:", response);

      setLoading(false);
    } catch (error) {
      console.log("Error:", error.message);
      setLoading(false);
    }
  };

  // Common input styling
  const inputClasses =
    "w-full rounded-md border border-richblack-600 bg-richblack-800 px-4 py-3 text-sm text-richblack-5 outline-none placeholder:text-richblack-400 transition-all duration-200 focus:border-yellow-50 sm:text-base";

  // Label styling
  const labelClasses =
    "mb-2 text-sm font-medium text-richblack-5 sm:text-base";

  // Error styling
  const errorClasses =
    "mt-1 text-xs text-pink-200 sm:text-sm";

  return (
    <form
      onSubmit={handleSubmit(submitContactForm)}
      className="mx-auto flex w-full max-w-3xl flex-col gap-5 sm:gap-6"
    >
      {/* ================================================= */}
      {/* First Name + Last Name */}
      {/* ================================================= */}

      <div className="flex w-full flex-col gap-5 sm:flex-row">

        {/* First Name */}
        <div className="flex w-full flex-col sm:w-1/2">
          <label htmlFor="firstname" className={labelClasses}>
            First Name
          </label>

          <input
            type="text"
            id="firstname"
            placeholder="Enter First Name"
            className={inputClasses}
            {...register("firstname", {
              required: "Please enter your first name",
            })}
          />

          {errors.firstname && (
            <span className={errorClasses}>
              {errors.firstname.message}
            </span>
          )}
        </div>

        {/* Last Name */}
        <div className="flex w-full flex-col sm:w-1/2">
          <label htmlFor="lastname" className={labelClasses}>
            Last Name
          </label>

          <input
            type="text"
            id="lastname"
            placeholder="Enter Last Name"
            className={inputClasses}
            {...register("lastname", {
              required: "Please enter your last name",
            })}
          />

          {errors.lastname && (
            <span className={errorClasses}>
              {errors.lastname.message}
            </span>
          )}
        </div>
      </div>

      {/* ================================================= */}
      {/* Email */}
      {/* ================================================= */}

      <div className="flex w-full flex-col">
        <label htmlFor="email" className={labelClasses}>
          Email Address
        </label>

        <input
          type="email"
          id="email"
          placeholder="Enter Your Email"
          className={inputClasses}
          {...register("email", {
            required: "Please enter your email address",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
        />

        {errors.email && (
          <span className={errorClasses}>
            {errors.email.message}
          </span>
        )}
      </div>

      {/* ================================================= */}
      {/* Phone Number */}
      {/* ================================================= */}

      <div className="flex w-full flex-col">
        <label htmlFor="phoneNo" className={labelClasses}>
          Phone Number
        </label>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">

          {/* Country Code */}
          <div className="w-full sm:w-[30%] md:w-[25%]">
            <select
              id="countryCode"
              className="w-full cursor-pointer rounded-md border border-richblack-600 bg-richblack-800 px-3 py-3 text-sm text-richblack-5 outline-none transition-all duration-200 focus:border-yellow-50 sm:text-base"
              {...register("countryCode", {
                required: "Please select a country code",
              })}
            >
              <option value="">
                Select Code
              </option>

              {CountryCode.map((element, index) => (
                <option
                  key={index}
                  value={element.code}
                  className="bg-richblack-800 text-richblack-5"
                >
                  {element.code} - {element.country}
                </option>
              ))}
            </select>

            {errors.countryCode && (
              <span className={errorClasses}>
                {errors.countryCode.message}
              </span>
            )}
          </div>

          {/* Phone Number */}
          <div className="w-full sm:w-[70%] md:w-[75%]">
            
<input
  type="text"
  id="phoneNo"
  placeholder="Enter Your Phone Number"
  inputMode="numeric"
  maxLength={10}
  className={inputClasses}
  onInput={(e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  }}
  {...register("phoneNo", {
    required: "Phone number is required",
    pattern: {
      value: /^[0-9]{10}$/,
      message: "Phone number must be exactly 10 digits",
    },
  })}
/>


            {errors.phoneNo && (
              <span className={errorClasses}>
                {errors.phoneNo.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* Message */}
      {/* ================================================= */}

      <div className="flex w-full flex-col">
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>

        <textarea
          id="message"
          rows="7"
          placeholder="Enter Your Message Here"
          className={`${inputClasses} resize-none`}
          {...register("message", {
            required: "Please enter your message",
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters",
            },
          })}
        />

        {errors.message && (
          <span className={errorClasses}>
            {errors.message.message}
          </span>
        )}
      </div>

      {/* ================================================= */}
      {/* Submit Button */}
      {/* ================================================= */}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full rounded-md bg-yellow-50 px-6 py-3 text-sm font-bold text-richblack-900 transition-all duration-200 hover:bg-yellow-100 hover:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit sm:text-base"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactUsForm;

