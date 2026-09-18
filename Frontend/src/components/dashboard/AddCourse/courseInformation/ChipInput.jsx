
import React from "react";
import { IoClose } from "react-icons/io5";

const ChipInput = ({
  label,
  name,
  placeholder,
  errors,
  setValue,
  getValues,
}) => {
  const tags = getValues(name) || [];

  const removeTag = (index) => {
    const currentTags = getValues(name) || [];

    const updatedTags = currentTags.filter((_, i) => i !== index);

    setValue(name, updatedTags, {
      shouldValidate: true,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm text-richblack-5">
        {label}
      </label>

      <div className="flex min-h-[48px] w-full flex-wrap items-center gap-2 rounded-lg border border-richblack-600 bg-richblack-700 p-3">
        {tags.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-sm font-medium text-richblack-900"
          >
            <span>{item}</span>

            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-richblack-900 hover:text-red-600"
            >
              <IoClose />
            </button>
          </div>
        ))}

        {tags.length === 0 && (
          <span className="text-sm text-richblack-400">
            {placeholder}
          </span>
        )}
      </div>

      {errors?.[name] && (
        <span className="text-xs text-pink-200">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
};

export default ChipInput;
