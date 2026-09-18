import React, { useEffect, useState } from "react";

const RequirementField = ({
  name,
  label,
  register,
  errors,
  setValue,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    register(name, {
      validate: (value) =>
        value?.length > 0 || `${label} is required`,
    });
  }, [register, name, label]);

  useEffect(() => {
    setValue(name, requirementList, {
      shouldValidate: true,
    });
  }, [requirementList, setValue, name]);

  const handleAddRequirements = () => {
    const trimmedRequirement = requirement.trim();

    if (trimmedRequirement) {
      setRequirementList((prev) => [
        ...prev,
        trimmedRequirement,
      ]);
      setRequirement("");
    }
  };

  const handleRemoveRequirements = (index) => {
    setRequirementList((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-richblack-5"
      >
        {label}
        <sup className="ml-1 text-pink-200">*</sup>
      </label>

      <div className="flex gap-3">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddRequirements();
            }
          }}
          placeholder="Enter a requirement"
          className="flex-1 rounded-md bg-richblack-700 px-4 py-3 text-richblack-5 outline-none ring-1 ring-richblack-600 transition-all placeholder:text-richblack-400 focus:ring-2 focus:ring-yellow-50"
        />

        <button
          type="button"
          onClick={handleAddRequirements}
          className="rounded-md bg-yellow-50 px-5 py-3 font-semibold text-richblack-900 transition-all hover:scale-95"
        >
          Add
        </button>
      </div>

      {requirementList.length > 0 && (
        <ul className="mt-2 space-y-2">
          {requirementList.map((requirement, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-md bg-richblack-700 px-4 py-3 text-richblack-5"
            >
              <span className="text-sm">{requirement}</span>

              <button
                type="button"
                onClick={() => handleRemoveRequirements(index)}
                className="text-xs font-medium text-pure-greys-300 transition-colors hover:text-pink-200"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span className="text-sm text-pink-200">
          {errors[name]?.message || `${label} is required`}
        </span>
      )}
    </div>
  );
};

export default RequirementField;