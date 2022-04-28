const fs = require('fs')
const {
    v4: uuidv4
} = require('uuid');
/**
 * 
 * @param {*} filename
 * @returns 
 */
let readFile = (filename) => JSON.parse(fs.readFileSync(filename))
/**
 * 
 * @param {*} filename 
 * @param {*} data 
 * @returns 
 */
let writeFile = (filename, data) => fs.writeFileSync(filename, JSON.stringify(data))

let path = './data/questions_data.json'

/**
 * 
 * @param {*} question 
 * @returns 
 */
let addQuestion = (question) => {
    let status = false;
    let questions = readFile(path);
    let questionTitle = question.questionTitle;
    let answer = question.answers;
    let correctAnswer = question.correctAnswer;
    if (questionTitle !== undefined && answer !== undefined && correctAnswer !== undefined) {
        let newQuestion = {
            "id": uuidv4(),
            "questionTitle": questionTitle,
            "answerTitle": answer,
            "correctAnswer": correctAnswer
        }
        questions.push(newQuestion);
        writeFile(path, questions);
        status = true;
    }
    return status

}

/**
 * @param {*} id
 * @returns 
 */
let removeQuestion = (id) => {
    let questions = readFile(path)
    let status = false
    let index = questions.findIndex(question => question.id === id)
    if (index !== -1) {
        questions.splice(index, 1)
        status = true
    }
    writeFile(path, questions)
    return status
}

/**
 * @param {*} id
 * @returns 
 */
 let updateQuestion = (question, id) => {
    let questions = readFile(path)
    let index = questions.findIndex(question => question.id === id)
    let status = false
    if (index !== -1) {
        let newQuestion = questions[index];
        if (question.questionTitle !== undefined) {
            newQuestion.questionTitle = question.questionTitle
        }
        if (question.answers !== undefined) {
            newQuestion.answers = question.answers
        }
        if (question.correctAnswer !== undefined) {
            newQuestion.correctAnswer = question.correctAnswer
        }
        
        status = true
    }
    writeFile(path, questions)
    return status
}




/**
 * 
 * @returns 
 */
let getQuestion = () => readFile(path)


module.exports = {
    readFile,
    writeFile,
    getQuestion,
    addQuestion,
    removeQuestion,
    updateQuestion
}