const express = require("express");
const { getSurveys, createSurvey, updateSurvey, deleteSurvey } = require("../controllers/survey.js");

const router = express.Router();

router.get("/getSurveys", getSurveys);
router.post("/createSurvey", createSurvey);
router.patch("/updateSurvey/:id", updateSurvey);
router.delete("/deleteSurvey/:id", deleteSurvey);

module.exports = router;