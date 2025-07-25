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
 
const updateCourse = async (req, res) => {
  try {
    const { title, description, duration, technology, tags, courseDescription } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // Update fields if they exist in req.body
    if (title) course.title = title;
    if (description) course.description = description;
    if (duration) course.duration = duration;
    if (technology) course.technology = technology;
    if (tags) course.tags = tags;
    if (courseDescription) course.courseDescription = courseDescription;

    // If a new image is provided
    if (req.file) {
      const imageBase64 = req.file.buffer.toString("base64");
      const imageData = `data:${req.file.mimetype};base64,${imageBase64}`;
      course.image = imageData;
    }

    await course.save();

    res.json({ msg: "Course updated successfully!", course });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ msg: "Server error" });
  }
};


const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    res.json({ msg: "Course deleted successfully!" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ msg: "Server error" });
  }
};


module.exports = { addCourse, getCourses ,getCourseById,updateCourse,deleteCourse};