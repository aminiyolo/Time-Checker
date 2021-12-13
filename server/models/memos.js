const mongoose = require("mongoose");

const memoSchema = mongoose.Schema(
  {
    id: {
      type: String,
    },
    memo: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true },
);

const Memo = mongoose.model("Memo", memoSchema);
module.exports = { Memo };
