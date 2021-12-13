const express = require("express");
const router = express.Router();
const { Record } = require("../models/record");

router.post("/post", async (req, res) => {
  const { category, total, date, id, time } = req.body;
  console.log(time);
  const data = await Record.findOne({ date, id });
  try {
    if (data) {
      const result = await Record.findOneAndUpdate(
        { date, id },
        {
          $inc: { [category]: total },
          $push: { times: time },
        },
        { new: true },
      );
      return res.status(200).json(result);
    } else {
      const record = new Record({
        [category]: total,
        date,
        id,
        times: [time],
      });
      await record.save();
      return res.status(200).json(record);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/get", async (req, res) => {
  const { date, id } = req.query;
  try {
    const data = await Record.findOne({ date, id });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
