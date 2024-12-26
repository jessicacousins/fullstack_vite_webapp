const dotenv = require("dotenv");
dotenv.config();

const godEmail = process.env.ADMIN_EMAIL;

const authMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Assign "god" role if the email matches
  if (req.user.email === godEmail) {
    req.user.role = "god";
  }

  next();
};

module.exports = authMiddleware;
