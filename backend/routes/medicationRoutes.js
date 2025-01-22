const express = require("express");
const router = express.Router();
const multer = require("multer");
const Medication = require("../models/Medication");

const upload = multer({ dest: "uploads/" });

// GET /api/medications
router.get("/", async (req, res) => {
  try {
    const medications = await Medication.find();
    res.json(medications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// POST /api/medications
router.post(
  "/",
  upload.fields([{ name: "labelImage" }, { name: "medOrder" }]),
  async (req, res) => {
    try {
      const {
        name,
        dose,
        route,
        time,
        person,
        submittedBy,
        acknowledgedByName,
        acknowledgedCheckbox,
        comments,
        refused,
      } = req.body;

      const labelImagePath = req.files?.labelImage?.[0]?.path || null;
      const medOrderPath = req.files?.medOrder?.[0]?.path || null;

      const medication = new Medication({
        name,
        dose,
        route,
        time,
        person,
        image: labelImagePath,
        orders: medOrderPath,
        submittedBy,
        submitTime: new Date(), //  submission time
        acknowledgedBy: {
          name: acknowledgedByName,
          timestamp: new Date(), // acknowledgment timestamp
        },
        acknowledgedCheckbox: acknowledgedCheckbox === "true", // checkbox is tracked
        comments: comments || "",
        refused: refused === "true",
      });

      await medication.save();
      res.json(medication);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
