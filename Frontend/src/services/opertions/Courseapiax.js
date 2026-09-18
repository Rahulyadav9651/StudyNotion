// Add this function to your services/opertions/courseAPI.js file (if using axios)

import axiosInstance from "../axiosInstance"; // Adjust the path to your axios config

export const getSectionDetails = async (sectionId, token) => {
  try {
    const response = await axiosInstance.get(
      `/courses/section/${sectionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching section details:", error);
    throw error;
  }
};