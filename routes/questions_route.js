const express = require('express');
const router = express.Router();

const questionModel = require('../models/questions_model')

// questions route
router.get('/', (req, res) => {
    res.send(questionModel.getQuestion())
})

router.post('/', (req, res) => {
    let isAddQuestion = questionModel.addQuestion(req.body)
    if (isAddQuestion) {
        res.status(201).send({
            "message": 'question added successfully'
        })
    } else {
        res.status(500).send({
            "message": 'All field required'
        })
    }
})

router.delete('/:id', (req, res) => {
    let id = req.params.id
    let isDeleteQuestion = questionModel.removeQuestion(id)
    if (isDeleteQuestion) {
        res.status(200).send({
            "message": 'question deleted successfully'
        })
    } else {
        res.status(404).send({
            "message": 'question id not found'
        })
    }
})

router.patch('/:id', (req, res) => {
    let id = req.params.id
    let isUpdateQuestion = questionModel.updateQuestion(req.body,id)
    if (isUpdateQuestion) {
        res.status(200).send({
            "message": 'question updated successfully'
        })
    } else {
        res.status(404).send({
            "message": 'question id not found'
        })
    }
})

module.exports = router