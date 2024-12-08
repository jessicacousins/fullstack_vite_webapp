const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  address: {
    line1: String,
    city: String,
    state: String,
    postal_code: String,
    country: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
