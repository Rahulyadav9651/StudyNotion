



export const getSectionDetails = async (sectionId, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/courses/section/${sectionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || data; // Adjust based on your API response structure
  } catch (error) {
    console.error("Error fetching section details:", error);
    throw error;
  }
};




