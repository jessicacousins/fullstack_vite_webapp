const mongoose = require("mongoose");
require("dotenv").config();

// Replace with your MongoDB URI and Admin Email
const uri = process.env.MONGO_URI;
const adminEmail = process.env.ADMIN_EMAIL;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    const db = mongoose.connection.db;

    db.collection("employees")
      .updateOne({ email: adminEmail }, { $set: { role: "god" } })
      .then(() => {
        console.log(`Role updated successfully for ${adminEmail}`);
        mongoose.disconnect();
      })
      .catch((err) => {
        console.error("Error updating role:", err);
        mongoose.disconnect();
      });
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));
