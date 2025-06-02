// const Course = require("../models/courses");

// const addCourse = async (req, res) => {
//   try {
//     const { title, description } = req.body;

//     if (!title || !description) {
//       return res.status(400).json({ msg: "Title and description are required!" });
//     }

//     if (!req.file) {
//       return res.status(400).json({ msg: "Image is required!" });
//     }

//     const imageBase64 = req.file.buffer.toString("base64");
//     const imageData = `data:${req.file.mimetype};base64,${imageBase64}`;

//     const newCourse = new Course({
//       title,
//       description,
//       image: imageData,
//     });

//     await newCourse.save();

//     res.status(201).json({ msg: "Course added successfully!", course: newCourse });
//   } catch (error) {
//     console.error("Error adding course:", error);
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// const getCourses = async (req, res) => {
//   try {
//     const courses = await Course.find();
//     const total = await Course.countDocuments();

//     res.json({ total, courses });
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     res.status(500).json({ msg: "Server error" });
//   }
// };


// module.exports = { addCourse, getCourses };


const Course = require("../models/courses");
 
const addCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
 
    if (!title || !description) {
      return res.status(400).json({ msg: "Title and description are required!" });
    }
 
    if (!req.file) {
      return res.status(400).json({ msg: "Image is required!" });
    }
 
    const imageBase64 = req.file.buffer.toString("base64");
    const imageData = `data:${req.file.mimetype};base64,${imageBase64}`;
 
    const newCourse = new Course({
      title,
      description,
      image: imageData,
    });
 
    await newCourse.save();
 
    res.status(201).json({ msg: "Course added successfully!", course: newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
 
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    const total = await Course.countDocuments();
 
    res.json({ total, courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
 
 
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
 
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
 
    res.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
 
module.exports = { addCourse, getCourses ,getCourseById};