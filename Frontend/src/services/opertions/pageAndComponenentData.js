import React from 'react'
import { BiLoaderCircle } from "react-icons/bi";
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';
import { toast } from "react-hot-toast";


// const getCatalogPageData = async(categoryId) => {
// //const toastId=  toast.loading(<BiLoaderCircle/>)
// const toastId = toast.loading(
//   "Loading..."
// );
//  let result=[]
//  try{
// const res= await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId});

// if(!res.data.success)
//     throw new Error("Could not fetch Category page data");
// result= res.data;


//  }
//  catch(error){
// console.log("Catalog page api ERROR".error);
// toast.error(error.message)
//  }

// toast.dismiss(toastId)
// return result

// }



const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");

  let result = [];

  console.log("========== CATALOG API DEBUG ==========");
  console.log("1. categoryId received:", categoryId);
  console.log("2. API URL:", catalogData.CATALOGPAGEDATA_API);

  try {
    // Check categoryId before API call
    if (!categoryId) {
      console.error("❌ categoryId is missing!");
      throw new Error("Category ID is missing");
    }

    const res = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      {
        categoryId: categoryId,
      }
    );

    console.log("3. API response:", res);
    console.log("4. Response data:", res.data);
    console.log("5. Success:", res.data?.success);

    if (!res.data?.success) {
      console.error("❌ API returned success: false");
      throw new Error(
        res.data?.message || "Could not fetch Category page data"
      );
    }

    result = res.data;

    console.log("6. Final catalog result:", result);
    console.log("========== CATALOG API SUCCESS ==========");
  } catch (error) {
    console.error("========== CATALOG API ERROR ==========");
    console.error("Error object:", error);
    console.error("Error message:", error.message);
    console.error("Error response:", error.response);
    console.error("Error response data:", error.response?.data);
    console.error("Error status:", error.response?.status);
    console.error("=========================================");

    toast.error(
      error.response?.data?.message ||
      error.message ||
      "Something went wrong"
    );
  }

  toast.dismiss(toastId);

  console.log("7. Returning result:", result);

  return result;
};


export default getCatalogPageData;
