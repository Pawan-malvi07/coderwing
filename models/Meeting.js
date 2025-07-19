const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  datetime: { type: Date, required: true } // 👈 Only one datetime field
});

module.exports = mongoose.model("Event", eventSchema);
