const express = require("express");
const router = express.Router();
const { Memo } = require("../models/memos");

router.get("/get", async (req, res) => {
  const { id, date } = req.query;
  try {
    const result = await Memo.findOne({ id, date });
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
});

router.post("/post", async (req, res) => {
  const { id, memo, date } = req.body;
  const data = await Memo.findOne({ id, date });
  try {
    if (data) {
      const data = await Memo.findOneAndUpdate(
        { id, date },
        {
          memo,
        },
        { new: true },
      );

      return res.status(200).json(data);
    } else {
      const result = new Memo({
        id,
        memo,
        date,
      });
      await result.save();
      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
