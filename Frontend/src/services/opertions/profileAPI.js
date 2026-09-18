import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API } = profileEndpoints

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {

    
    console.log(
  "GET_USER_ENROLLED_COURSES_API API ERROR............",
  error.response?.data || error.message
);


    //console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}



// export async function getUserEnrolledCourses(token) {
//   debugger; // 🔴 1. Function starts

//   const toastId = toast.loading("Loading...");
//   let result = [];

//   console.log("TOKEN:", token);
//   console.log("API URL:", GET_USER_ENROLLED_COURSES_API);

//   try {
//     debugger; // 🔴 2. Before API call

//     console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");

//     const response = await apiConnector(
//       "GET",
//       GET_USER_ENROLLED_COURSES_API,
//       null,
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );

//     debugger; // 🔴 3. API response received

//     console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
//     console.log("FULL API RESPONSE:", response);
//     console.log("RESPONSE DATA:", response.data);

//     if (!response.data.success) {
//       debugger; // 🔴 4. Backend returned success: false

//       console.log("BACKEND ERROR MESSAGE:", response.data.message);

//       throw new Error(response.data.message);
//     }

//     debugger; // 🔴 5. Before assigning courses

//     result = response.data.data;

//     console.log("ENROLLED COURSES:", result);
//     console.log("NUMBER OF COURSES:", result?.length);

//   } catch (error) {
//     debugger; // 🔴 6. Error occurred

//     console.log("ERROR OBJECT:", error);

//     console.log(
//       "GET_USER_ENROLLED_COURSES_API API ERROR............",
//       error.response?.data || error.message
//     );

//     console.log("ERROR STATUS:", error.response?.status);
//     console.log("ERROR MESSAGE:", error.message);

//     toast.error("Could Not Get Enrolled Courses");
//   }

//   debugger; // 🔴 7. Before returning result

//   toast.dismiss(toastId);

//   console.log("FINAL RESULT:", result);

//   return result;
// }

