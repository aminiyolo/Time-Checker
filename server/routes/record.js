const express = require("express");
const router = express.Router();
const { Record } = require("../models/record");

router.post("/post", async (req, res) => {
  const { category, total, date, id } = req.body;
  const result = await Record.findOne({ date, id });

  try {
    if (result) {
      const data = await Record.findOneAndUpdate(
        { date, id },
        {
          $inc: { [category]: total },
        },
        { new: true },
      );
      return res.status(200).json(data);
    } else {
      const record = await new Record({
        [category]: total,
        date,
        id,
      });

      return res.status(200).json(record);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
