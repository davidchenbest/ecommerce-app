const express = require("express");
const app = express();
const { PORT } = require("./config");
const cookieParser = require('cookie-parser');
require('./utils/dbConnect')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { authMiddleWare } = require("./middlewares/authMiddleware");
app.use(authRoutes);
app.use(userRoutes);
app.use(authMiddleWare(['admin']), adminRoutes);

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(PORT, () => console.log("listening on port " + PORT));
