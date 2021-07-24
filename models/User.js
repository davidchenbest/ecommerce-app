const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter an username"],
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'Email Require'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  address: {
    streetAddress: String,
    city: String,
    state: String,
    zip: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: { type: String },
});

// fire a function before doc saved to db
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect username');
};

// export userschema
module.exports = { User: mongoose.model("User", UserSchema) };
