const express = require("express");
const app = express();
const { PORT, MONGO_URI } = require("./config");
const mongoose = require("mongoose");
const { User } = require("./models/User");

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const auth = require("./routes/auth");
app.use(auth);

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(PORT, () => console.log("listening on port " + PORT));
