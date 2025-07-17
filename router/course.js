const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses-controller");

// Configure multer to store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ROUTES
router.post("/add-course", upload.single("image"), addCourse);
router.get("/get-courses", getCourses);
router.get("/:id", getCourseById);
router.put("/update-course/:id", upload.single("image"), updateCourse);
router.delete("/delete-course/:id", deleteCourse);

module.exports = router;
