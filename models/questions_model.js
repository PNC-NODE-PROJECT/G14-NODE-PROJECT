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
 * 
 * @returns 
 */
let getQuestion = () => readFile(path)


module.exports = {
    readFile,
    writeFile,
    getQuestion,
    addQuestion
}