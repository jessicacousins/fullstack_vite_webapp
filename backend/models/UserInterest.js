const mongoose = require("mongoose");

const UserInterestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  viewedProducts: [
    {
      productId: String,
      category: String,
      title: String,
      viewedAt: { type: Date, default: Date.now },
    },
  ],
});

const UserInterest = mongoose.model("UserInterest", UserInterestSchema);
module.exports = UserInterest;
