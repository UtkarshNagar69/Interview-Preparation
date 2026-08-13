const express = require("express");
const router = express.Router();

const {
  startInterview,
  addQuestionsToAttempt,
  submitAnswer,
} = require("../controllers/attemptController");

const { authentication } = require("../middlewares/auth");

router.post("/start-interview/:interviewId", authentication, startInterview);
router.post("/:attemptId/questions", authentication, addQuestionsToAttempt);
router.put(
  "/:attemptId/question/:questionId/answer",
  authentication,
  submitAnswer,
);

module.exports = router;
