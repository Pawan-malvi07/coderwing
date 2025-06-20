const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addCourse, getCourses , getCourseById } = require("../controllers/courses-controller");
 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
 
 
router.post("/add-course", upload.single("image"), addCourse);
router.get("/get-courses", getCourses);
router.get('/:id', getCourseById);
 
module.exports = router;