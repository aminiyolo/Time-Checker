const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_ID, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/api/users", require("./routes/user"));
app.use("/api/records", require("./routes/record"));
app.use("/api/memos", require("./routes/memos"));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
