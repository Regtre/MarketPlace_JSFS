const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../db.config");

const userSchema = mongoose.Schema(
  {
    pseudo: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    money: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

userSchema.methods = {
  /**
   * Check if this password is good
   * @param {String} password to check
   * @returns boolean
   */
  authenticate: function (password) {
    return passwordHash.verify(password, this.password);
  },
  getToken: function () {
    return jwt.encode(this, config.secret);
  },
};

module.exports = mongoose.model("User", userSchema);

// schema must be "compiled" into a model and "bound" to a collection of a database managed by a connection
const dbConnection = require("../controllers/db.controller");
const User = dbConnection.model("User", userSchema, "users");

// export the model
module.exports.model = User;
