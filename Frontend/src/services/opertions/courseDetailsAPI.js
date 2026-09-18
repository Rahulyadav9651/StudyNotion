import { toast } from "react-hot-toast"

import { updateCompletedLectures } from "../../slices/viewCourseSlice"
// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../apis"

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints

export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_COURSE_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}



export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    })
    //console.log("COURSE_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
   // console.log("COURSE_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}








// export const fetchCourseDetails = async (courseId) => {
//   debugger; // 🔴 1. Function starts

//   console.log("========== FETCH COURSE DETAILS START ==========");
//   console.log("Course ID:", courseId);
//   console.log("Course ID type:", typeof courseId);
//   console.log("API URL:", COURSE_DETAILS_API);

//   const toastId = toast.loading("Loading...");

//   // dispatch(setLoading(true));

//   let result = null;

//   try {
//     debugger; // 🔴 2. Before API call

//     console.log("BEFORE CALLING COURSE_DETAILS_API");

//     const requestData = {
//       courseId,
//     };

//     console.log("REQUEST DATA:", requestData);

//     const response = await apiConnector(
//       "POST",
//       COURSE_DETAILS_API,
//       requestData
//     );

//     debugger; // 🔴 3. API response received

//     console.log("AFTER CALLING COURSE_DETAILS_API");

//     console.log(
//       "COURSE_DETAILS_API API RESPONSE............",
//       response
//     );

//     console.log("Response status:", response?.status);
//     console.log("Response data:", response?.data);
//     console.log("Response success:", response?.data?.success);
//     console.log("Response message:", response?.data?.message);

//     if (!response.data.success) {
//       debugger; // 🔴 4. Backend returned success: false

//       console.log(
//         "Backend returned success FALSE"
//       );

//       console.log(
//         "Backend error message:",
//         response.data.message
//       );

//       throw new Error(response.data.message);
//     }

//     debugger; // 🔴 5. Before setting result

//     result = response.data;

//     console.log("COURSE DETAILS RESULT:", result);

//   } catch (error) {
//     debugger; // 🔴 6. Error occurred

//     console.log("========== COURSE DETAILS ERROR ==========");

//     console.log(
//       "COURSE_DETAILS_API API ERROR............",
//       error
//     );

//     console.log("Error message:", error?.message);
//     console.log("Error response:", error?.response);
//     console.log("Error response data:", error?.response?.data);
//     console.log("Error status:", error?.response?.status);

//     // ⚠️ Prevent another error if error.response is undefined
//     result = error?.response?.data || {
//       success: false,
//       message: error?.message || "Something went wrong",
//     };

//     console.log("ERROR RESULT:", result);

//     // toast.error(error.response.data.message);
//   }

//   debugger; // 🔴 7. Before dismissing toast and returning

//   toast.dismiss(toastId);

//   console.log("FINAL RESULT:", result);
//   console.log("========== FETCH COURSE DETAILS END ==========");

//   // dispatch(setLoading(false));

//   return result;
// };



// fetching the available course categories

export const fetchCourseCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API)
   // console.log("COURSE_CATEGORIES_API API RESPONSE............", response)


    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data
    

  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR............", error)
    toast.error(error.message)
console.log(
  "GET_USER_ENROLLED_COURSES_API API ERROR............",
  error.response?.data || error.message
);

  }
  return result
}

// add the course details
export const addCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    }
    toast.success("Course Details Added Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// edit the course details
export const editCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Course Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}





// export const editCourseDetails = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")

//   console.log("========================================")
//   console.log("🔍 EDIT COURSE DETAILS DEBUG")
//   console.log("========================================")

//   try {
//     console.log("📌 API URL:", EDIT_COURSE_API)
//     console.log("📌 Token exists:", !!token)
//     console.log("📌 Token:", token)

//     // Debug FormData
//     console.log("📦 FormData contents:")

//     if (data instanceof FormData) {
//       for (let [key, value] of data.entries()) {
//         console.log(`   ${key}:`, value)
//       }
//     } else {
//       console.log("⚠️ Data is NOT FormData")
//       console.log("📦 Data:", data)
//     }

//     const response = await apiConnector(
//       "POST",
//       EDIT_COURSE_API,
//       data,
//       {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       }
//     )

//     console.log("========================================")
//     console.log("✅ EDIT COURSE API RESPONSE")
//     console.log("========================================")
//     console.log("📡 Status:", response?.status)
//     console.log("📦 Response:", response)
//     console.log("📦 Response Data:", response?.data)
//     console.log("📦 Success:", response?.data?.success)

//     if (!response?.data?.success) {
//       throw new Error(
//         response?.data?.message || "Could Not Update Course Details"
//       )
//     }

//     toast.success("Course Details Updated Successfully")

//     result = response?.data?.data

//     console.log("✅ Updated Course:", result)
//   } catch (error) {
//     console.log("========================================")
//     console.log("❌ EDIT COURSE API ERROR")
//     console.log("========================================")

//     console.log("❌ Error:", error)
//     console.log("❌ Error Message:", error?.message)
//     console.log("❌ Error Response:", error?.response)
//     console.log("❌ Error Response Data:", error?.response?.data)
//     console.log("❌ Error Status:", error?.response?.status)
//     console.log("❌ Error Headers:", error?.response?.headers)

//     toast.error(
//       error?.response?.data?.message ||
//       error?.message ||
//       "Something went wrong"
//     )
//   }

//   toast.dismiss(toastId)

//   console.log("========================================")
//   console.log("🏁 EDIT COURSE DEBUG END")
//   console.log("========================================")

//   return result
// }


// create a section



export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result = response?.data?.updatedCourse
  } catch (error) {

    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)

  //console.error("Request body:", req.body)
//   //cstonsole.error("Error message:", error.message)
   console.error("Error name:", error.name)
   //console.error("Error stack:", error.ack)
  



  }
  toast.dismiss(toastId)
  return result
}

// create a subsection
export const createSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }
    toast.success("Lecture Added")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// export const createSubSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     // 🔍 DEBUG 1: Log the exact data being sent
//     console.log("📤 SENDING DATA:", JSON.stringify(data, null, 2))
//     console.log("📤 DATA KEYS:", Object.keys(data))
//     console.log("📤 DATA TYPES:", {
//       sectionId: typeof data.sectionId,
//       title: typeof data.title,
//       description: typeof data.description,
//       videoFile: data.videoFile?.name || "No file",
//     })

   

//     // 🔍 DEBUG 3: Log request headers
//     console.log("📋 REQUEST HEADERS:", {
//       Authorization: `Bearer ${token ? "***token***" : "NO TOKEN"}`,
//     })

//     // 🔍 DEBUG 4: Make the API call
//     const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     })

//     // 🔍 DEBUG 5: Log full response
//     console.log("✅ CREATE SUB-SECTION API RESPONSE:", response)
//     console.log("✅ RESPONSE STATUS:", response?.status)
//     console.log("✅ RESPONSE DATA:", response?.data)

//     if (!response?.data?.success) {
//       throw new Error(
//         response?.data?.message || "Could Not Add Lecture"
//       )
//     }

//     toast.success("Lecture Added")
//     result = response?.data?.data
//   } catch (error) {
//     // 🔍 DEBUG 6: Detailed error logging
//     console.error("❌ CREATE SUB-SECTION API ERROR:", error)
//     console.error("❌ ERROR MESSAGE:", error.message)
//     console.error("❌ ERROR STATUS:", error.response?.status)
//     console.error("❌ ERROR DATA:", error.response?.data) // Backend error message
//     console.error("❌ ERROR RESPONSE:", JSON.stringify(error.response?.data, null, 2))

//     // Show backend error message instead of generic message
//     const errorMessage = 
//       error.response?.data?.message || 
//       error.response?.data?.error ||
//       error.message ||
//       "Could Not Add Lecture"
    
//     toast.error(errorMessage)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// update a section


export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// update a subsection
export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a section
export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
// delete a subsection
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("INSTRUCTOR COURSES API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a course
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course Deleted")
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

// get full details of a course
// export const getFullDetailsOfCourse = async (courseId, token) => {
//   const toastId = toast.loading("Loading...")
//   //   dispatch(setLoading(true));
//   let result = null
//   try {
//     const response = await apiConnector(
//       "POST",
//       GET_FULL_COURSE_DETAILS_AUTHENTICATED,
//       {
//         courseId,
//       },
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     )
//     console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

//     if (!response.data.success) {
//       throw new Error(response.data.message)
//     }
//     result = response?.data?.data
//   } catch (error) {
//     console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
//     result = error.response.data
//     // toast.error(error.response.data.message);
//   }
//   toast.dismiss(toastId)
//   //   dispatch(setLoading(false));
//   return result
// }

export const getFullDetailsOfCourse = async (courseId, token) => {
  debugger;

  const toastId = toast.loading("Loading...");

  let result = null;

  try {
    debugger;

    console.log("COURSE ID:", courseId);
    console.log("TOKEN:", token);

    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    debugger;

    console.log(
      "COURSE_FULL_DETAILS_API API RESPONSE............",
      response
    );

    console.log(
      "COURSE_FULL_DETAILS_API RESPONSE DATA............",
      response?.data
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }

    result = response?.data?.data;

    debugger;

    console.log(
      "COURSE_FULL_DETAILS_API RESULT............",
      result
    );

  } catch (error) {

    debugger;

    console.log(
      "COURSE_FULL_DETAILS_API API ERROR............",
      error
    );

    console.log(
      "ERROR RESPONSE............",
      error?.response
    );

    console.log(
      "ERROR RESPONSE DATA............",
      error?.response?.data
    );

    result = error?.response?.data || {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }

  toast.dismiss(toastId);

  debugger;

  console.log(
    "COURSE_FULL_DETAILS_API FINAL RESULT............",
    result
  );

  return result;
};






// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
  let result = null
  console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}

// create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}