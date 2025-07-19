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
  const { title, datetime } = req.body;

  try {
    const eventTime = new Date(datetime);

    if (isNaN(eventTime)) {
      return res.status(400).json({ message: "Invalid datetime format." });
    }

    if (eventTime < new Date()) {
      return res.status(400).json({ message: "Cannot schedule event in the past." });
    }

    const newEvent = new Event({ title, datetime: eventTime });
    await newEvent.save();
    res.status(201).json(newEvent);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = { getAllEvents, addEvent };
