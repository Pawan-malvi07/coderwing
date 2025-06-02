
// const mongoose = require('mongoose');

// const courseSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
  
//   },
// });

// module.exports = mongoose.model('Course', courseSchema);



const mongoose = require('mongoose');
 
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Base64 string
    required: true,
  },
  duration: {
    type: String,
    default: 'N/A',
  },
  technology: {
    type: String,
    default: 'N/A',
  },
  tags: {
    type: String,
    default: 'N/A',
  },
  courseDescription: {
    type: String,
    default: '',
  },
}, {
  timestamps: true
});
 
module.exports = mongoose.model('Course', courseSchema);