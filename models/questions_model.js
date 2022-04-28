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


/**
 * 
 * @param {*} questions
 * @returns 
 */
let addQuestion = (question) => {
    let questions = readFile('./data/questions_data.json')
    let status = false
    if (questions.questionTitle !== undefined ) {
        let newQuestion = {
            'id': uuidv4(),
            'questionTitle': questions.questionTitle,
            // 'answerA': question.answer.a
        }
        console.log(questions)
        questions.push(newQuestion)
        writeFile('./data/questions_data.json', questions)
        status = true
    }
    return status

}

let removeQuestion = (id) => {
    let questions = readFile('./data/questions_data.json')
    let status = false
    let index = questions.findIndex(question => question.id === id)
    if (index !== -1) {
        questions.splice(index, 1)
        status = true
    }
    writeFile('./data/questions_data.json', questions)
    return status
}

let updateQuestion = (question, id) => {
    let questions = readFile('./data/questions_data.json')
    let index = questions.findIndex(question => question.id === id)
    let status = false
    if (index !== -1) {
        let newQuestion = questions[index]
        if (question.questionTitle !== undefined) {
            newQuestion.questionTitle = question.questionTitle
        }
        if (question.price !== undefined) {
            newQuestion.price = question.price
        }
        
        status = true
    }
    writeFile('./data/questions_data.json', questions)
    return status
}

/**
 * 
 * @returns 
 */
let getQuestion = () => readFile('./data/questions_data.json')


module.exports = {
    readFile,
    addQuestion,
    writeFile,
    removeQuestion,
    updateQuestion,
    getQuestion
}