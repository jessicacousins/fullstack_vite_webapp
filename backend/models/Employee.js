const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  wage: { type: Number, required: true, default: 16.75 },
  federalTaxRate: { type: Number, default: 0.1 }, // Default 10%
  stateTaxRate: { type: Number, default: 0.05 }, // Default 5%
  localTaxRate: { type: Number, default: 0.02 }, // Default 2%
  paymentMethod: {
    type: String,
    enum: ["Direct Deposit", "Check"],
    default: "Direct Deposit",
  },
  bankDetails: {
    bankName: { type: String },
    accountNumber: { type: String },
    routingNumber: { type: String },
  },
  overtimeRate: { type: Number, default: 1.5 }, // 1.5x regular pay
});

module.exports = mongoose.model("Employee", EmployeeSchema);
