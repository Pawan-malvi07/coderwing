const Event = require("../models/Meeting");

const getAllEvents = async (req, res) => {
  try {
    const now = new Date();

    // Delete meetings that are in the past
    await Event.deleteMany({
      $expr: {
        $lt: [
          {
            $dateFromString: {
              dateString: { $concat: ["$date", "T", "$time"] }
            }
          },
          now
        ]
      }
    });

    // Return only future or today's remaining events
    const events = await Event.find();
    res.json(events);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addEvent = async (req, res) => {
    const { title, date, time } = req.body;
    try {
        const newEvent = new Event({ title, date, time });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getAllEvents, addEvent };
