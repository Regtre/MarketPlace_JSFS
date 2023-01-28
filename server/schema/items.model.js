const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  published_date: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: Number,
    default: 0,
  },
  id_owner: mongoose.ObjectId,
  sell: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Item", itemSchema);

// schema must be "compiled" into a model and "bound" to a collection of a database managed by a connection
const dbConnection = require("../controllers/db.controller");
const Items = dbConnection.model("Item", itemSchema, "items");

// export the model
module.exports.model = Items;
