const express = require("express");
const app = express();
const { PORT, MONGO_URI } = require("./config");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
app.use(authRoutes);
app.use(userRoutes);

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(PORT, () => console.log("listening on port " + PORT));
