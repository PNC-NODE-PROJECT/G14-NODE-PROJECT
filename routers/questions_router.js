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
router.post("/create", (req, res) => {
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
/**
 * delete the question from the data
 * @param req: request id in the object
 * @param res: respone the message success or id not found
 */
router.delete("/delete/:id", (req, res) => {
    let id = req.params.id
    let isDeleteQuestion = questionModel.removeQuestion(id)

    if (isDeleteQuestion) {
        res.status(200).send({
            "message": 'Question deleted successfully'
        })
    } else {
        res.status(404).send({
            "message": 'Question id not found'
        })
    }
})
/**
 * Update the question in the  object store
 * @param req: request the id of the object
 * @param res: response to the message it success or question id not found
 */
router.patch("/edit/:id", (req, res) => {
    let id = req.params.id
    let isUpdateQuestion = questionModel.updateQuestion(req.body, id)
    if (isUpdateQuestion) {
        res.status(200).send({
            "message": 'Question updated successfully'
        })
    } else {
        res.status(404).send({
            "message": 'Question id not found'
        })
    }
})


module.exports = router;