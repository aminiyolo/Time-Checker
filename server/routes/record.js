const express = require("express");
const router = express.Router();
const { Record } = require("../models/record");

router.post("/post", async (req, res) => {
  const { category, total, date, id } = req.body;
  const record = new Record({
    category: {
      [category]: total,
    },
    date,
    id,
  });
  try {
    const result = await record.save();
    console.log(result);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
