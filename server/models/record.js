const mongoose = require("mongoose");

const recordSchema = mongoose.Schema(
  {
    id: {
      type: String,
    },
    date: {
      type: String,
    },
    sleep: {
      type: Number,
    },
    coding: {
      type: Number,
    },
    exercise: {
      type: Number,
    },
    english: {
      type: Number,
    },
    reading: {
      type: Number,
    },
    times: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

const Record = mongoose.model("Record", recordSchema);

module.exports = { Record };
