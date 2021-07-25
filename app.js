const express = require("express");
const app = express();
const { PORT } = require("./config");
const cors = require('cors')
const cookieParser = require('cookie-parser');
require('./utils/dbConnect')

app.use(require('cors')({
  origin: function (origin, callback) {
    callback(null, origin);
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { authMiddleWare } = require("./middlewares/authMiddleware");
app.use(authRoutes);
app.use(userRoutes);
app.use(authMiddleWare(['admin']), adminRoutes);

app.listen(PORT, () => console.log("listening on port " + PORT));
