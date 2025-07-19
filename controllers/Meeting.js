const Event = require("../models/Meeting");

const getAllEvents = async (req, res) => {
  try {
    const now = new Date();

    await Event.deleteMany({ datetime: { $lt: now } });

    const events = await Event.find().sort({ datetime: 1 }); 
    res.json(events);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addEvent = async (req, res) => {
  const { title, date, time } = req.body;

  try {
    const datetime = new Date(`${date}T${time}`);

    if (isNaN(datetime)) {
      return res.status(400).json({ message: "Invalid date or time format." });
    }

    if (datetime < new Date()) {
      return res.status(400).json({ message: "Cannot create event in the past." });
    }

    const newEvent = new Event({ title, datetime });
    await newEvent.save();
    res.status(201).json(newEvent);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllEvents, addEvent };
