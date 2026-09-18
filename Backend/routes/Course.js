const express= require("express");
const router= express.Router();

//impoet all controller

//import Course controller

const {createCourse,getAllCourse,getCourseDetails,editCourse,getInstructorCourses,deleteCourse,getFullCourseDetails} = require("../controllers/Course")
//import Category Controllers
const {createCategories,showAllCategories,categoryPageDetails}= require("../controllers/Category");

//import Section controller
// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection")






// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview")

// Importing Middlewares
const  {auth, isInstructor, isStudent, isAdmin}  = require("../middlewares/auth")


// Courses can Only be Created by Instructors

router.post("/createCourse",auth,isInstructor,createCourse);
//Add a Section to a Course
router.post("/addSection",auth,isInstructor,createSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourse)
router.delete("/deleteCourse", deleteCourse)
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
router.post("/editCourse", auth, isInstructor, editCourse)
//  Category routes (Only by Admin)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)

//router.post("/createCategory", auth, isAdmin, createCategories)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

//   Rating and Review
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)
module.exports = router



