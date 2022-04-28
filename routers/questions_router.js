const express = require("express");
const router = express.Router();
const questionModel = require('../models/questions_model')

/**
 * Get all questions
 * @param req: the request objects
 * @param res: thee rsponse object
 * 
 */
router.get("/", (req, res) => {
    let questions = questionModel.getQuestion(); 
    res.send(questions);
})

/**
 * add the question
 * @param req: the request objects
 * @param res: the response to the message that it success or filed required
 */
router.post("/", (req, res) => {
    let isAddQuestion = questionModel.addQuestion(req.body)
    if (isAddQuestion) {
        res.status(201).send({
            "message": 'Question added successfully'
        })
    } else {
        res.status(500).send({
            "message": 'All field required'
        })
    }
})

module.exports = router;
