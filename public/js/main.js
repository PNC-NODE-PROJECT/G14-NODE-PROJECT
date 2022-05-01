// _____________________Data___________________
// _____________________Functions__________________
// Display the list of question on the DOM
// @param questions - the list of questions
//

//___________________Display Question_______________________________
function refreshDomElement(questions) {
    for (let quesion of questions) {
        let cardBox = document.createElement('div');
        cardBox.className = "cardBox";
        cardBox.id = quesion.id;
        let card = document.createElement("div");
        card.className = 'question-container';
        let title = document.createElement("h3");
        title.className = "cardTitle";
        title.textContent = quesion.questionTitle;
        card.appendChild(title);
        let ans1 = document.createElement("p");
        ans1.textContent = quesion.answers.a;
        card.appendChild(ans1);
        let ans2 = document.createElement("p");
        ans2.textContent = quesion.answers.b;
        card.appendChild(ans2);
        let ans3 = document.createElement("p");
        ans3.textContent = quesion.answers.c;
        card.appendChild(ans3);
        let ans4 = document.createElement("p");
        ans4.textContent = quesion.answers.d;
        card.appendChild(ans4);

        let editDeleteBox = document.createElement('div');
        editDeleteBox.className = "editDeleteBox";
        let editQuestion = document.createElement('img');
        editQuestion.style.width = "1.25rem";
        editQuestion.className = "editQuestion";
        editQuestion.src = "images/edit.png";
        editDeleteBox.appendChild(editQuestion);
        editQuestion.className = "editQuestion";

        let deleteQuestion = document.createElement("i");
        // deleteQuestion.style.width="1.25rem";
        // deleteQuestion.src="images/delete.png";
        deleteQuestion.className = "fa fa-trash";
        deleteQuestion.id = "delete";
        deleteQuestion.addEventListener("click", deleteQ);
        editDeleteBox.appendChild(deleteQuestion);

        cardBox.appendChild(card);
        cardBox.appendChild(editDeleteBox);
        getContainer.appendChild(cardBox);
    }
}

function displayQuestions() {
    axios.get("http://localhost:80/api/questions").then((response) => {
        let dataOfQuiz = response.data;
        refreshDomElement(dataOfQuiz);
    });
};

//_____________________Add the question_________________________________
function add() {
    let url = "http://localhost:80/api/questions/create";
    let question = questionAdd.value;
    let answer1 = answerAdd1.value;
    let answer2 = answerAdd2.value;
    let answer3 = answerAdd3.value;
    let answer4 = answerAdd4.value;
    let corrected = correctAn.value;
    let body = {
        questionTitle: question,
        answers: {
            a: answer1,
            b: answer2,
            c: answer3,
            d: answer4
        },
        correctAnswer: corrected
    }
    axios.post(url, body)
        .then((result) => {
            console.log(body);
        })
}
//______________Delete the question_____________
function deleteQ(event) {
    event.preventDefault();
    if (event.target.id === "delete") {
        // console.log(event.target.parentElement.parentElement.id);
        let id = event.target.parentElement.parentElement.id;
        let url = "http://localhost:80/api/questions/delete/" + id;
        axios.delete(url)
            .then((results) => {
                console.log(results);
            })
    }
}

//_____________Play quiz_______________________

function playQuiz(questions) { 
    // inputUsersName.appendChild(containersQuiz);

    while(containersQuiz.firstChild){
        containersQuiz.removeChild(containersQuiz.lastChild);
    }

    for (let question of questions) {
        let cardAns = document.createElement("div");
        cardAns.className = "cardAns";
        containersQuiz.appendChild(cardAns);
        let domQuestion = document.createElement("h3");
        domQuestion.innerHTML = question.questionTitle;
        cardAns.appendChild(domQuestion);

        let domAnswers = question.answers;
        console.log(domAnswers);
        for (let answer in domAnswers) {
            let ol = document.createElement("ol");
            cardAns.appendChild(ol);
            let li = document.createElement("li");
            ol.appendChild(li);
            let radio = document.createElement("input");
            radio.setAttribute("type", "radio");
            // radio.setAttribute("name", "ans");
            radio.setAttribute("name", question.id);
            radio.setAttribute("value", answer);
            li.appendChild(radio);
            let label = document.createElement("label");
            label.textContent = domAnswers[answer];
            li.appendChild(label)
        }
    }
    
}

function getQuestionToplay() {
    let url = "http://localhost:80/api/questions";
    axios.get(url)
    .then((response) => {
        let data = response.data;
        console.log(data);
        playQuiz(data);
        
    })
}
let scoreusers = 0
function computeScore(answers){
    let url = "http://localhost:80/api/questions";
    axios.get(url)
    .then((response) => {
        let array_questions = response.data;
        // console.log(data);
        // computeScore(data);
        let score = document.querySelector(".score");
        let labels = document.querySelectorAll('input[type="radio"]');
        // let domAnswers = data.answers;
        // console.log(label);
        let userChoice = 0;
        let array_user_ans = []
        for(let i = 0; i<labels.length; i++) {
            if (labels[i].checked) { 
                userChoice ++
                array_user_ans.push(labels[i].value);
                console.log(labels[i].value);
            }
        }
        if (userChoice === array_questions.length){
            for(let k = 0;k<array_questions.length;k++){
                if (array_questions[k].correctAnswer === array_user_ans[k]){
                    scoreusers ++;
                }
            }
            
        }else{
            alert("Should choose all questions")
            array_user_ans = [];
        }
        console.log(scoreusers);
        // array_questions.forEach(array => {
        //     console.log(array.correctAnswer);
        // });
    })

    // for (let answer in answers) {
    //     console.log(answer.correctAnswer);
    // }
    // correctAnswers = "";
    // noTrue = true;
    // let result = 0;
    // for(let value of label){
    //     if(value.checked){
    //         isOnetrue= false;
    //         for(let answer in answers){
    //             if(value.nextElementSibling.textContent === answer.correctAnswers && isOnetrue===false){
    //                 result += 1;
    //                 value.nextElementSibling.style.color ="green";
    //                 score.textContent = result;
    //                 noTrue=false;
    //                 isOnetrue= true;
    //             }
    //             else if (isOnetrue===false){
    //                 value.nextElementSibling.style.color ="red";
    //             }
    //         }  
    //     }
        
    // }
    // if(noTrue){
    //     score.textContent=result;
    // }
}

// function score(){
//     let url = "http://localhost:80/api/questions";
//     axios.get(url)
//     .then((response) => {
//         let data = response.data;
//         // console.log(data);
//         computeScore(data);
//     })
// }
// score();

//_______________Show and hide __________________________________
function showAndHide(event) {

    if (event.target.textContent === "Edit Quiz") {
        let getContainer = document.querySelector('#container');
        if (getContainer != null) {
            getContainer.style.display = 'none';
        }
        addBtn.style.display = "block";
        formAdd.style.display = 'none';
        playQuiz(questions);
        let usersPlay = document.querySelector(".userName");
        usersPlay.style.display = "none";
        buttonSubmit.style.display = "none";

        showScore.style.display = "none";
        hide_Quiz.style.borderBottom = "5px solid";
        hide_Quiz.style.borderBottomColor = "#0E578C";
        show_Quiz.style.borderBottom = "none";
    }
    if (event.target.textContent === "Play quiz") {
        event.preventDefault();
        let getContainer = document.querySelector('#container');
        if (getContainer != null) {
            getContainer.style.display = 'none';
        }
        addBtn.style.display = "none";
        formAdd.style.display = 'none';
        inputUsersName.style.display = "block";
        buttonSubmit.style.display = "block";
        showScore.style.display = "none";
        show_Quiz.style.borderBottom = "5px solid";
        show_Quiz.style.borderBottomColor = "#0E578C";
        hide_Quiz.style.borderBottom = "none";

    }
}

function hideQuetionAndgQuiz(event) {
    event.preventDefault();
    var containers = document.querySelector('#container');
    if (containers != null) {
        containers.style.display = 'none';
    }
    addBtn.style.display = "none";
    formAdd.style.display = 'block';
    var message = document.querySelector('.alert');
    message.style.display = 'none';
}

function btnCancle(event) {
    event.preventDefault();
    getContainer.style.display = "block";
}
// _______________________________Button Submit_______________________
let btnSubmit = document.createElement('button');
btnSubmit.classList.add('btn-submit');
btnSubmit.textContent = "Submit";
document.body.appendChild(btnSubmit);

// ________________________Variable_______________________________
let startQuiz = document.querySelector("#startQuiz");
let hide_Quiz = document.getElementById("create_question");
let show_Quiz = document.getElementById("play_quiz");
let addBtn = document.getElementById("btnAdd");
let formAdd = document.querySelector('.formToAdd');
let addList = document.querySelector('.addlist');
let inputUsersName = document.querySelector(".userName");
let showScore = document.querySelector(".header");
let buttonSubmit = document.querySelector(".btn-submit");
let buttonCancle = document.querySelector("#cancel");
// _____________________Style_____________________________________________________
formAdd.style.display = 'none';
inputUsersName.style.display = 'none';
buttonSubmit.style.display = 'none';


// _____________________Show and Hide Quiz________________________________________
document.addEventListener("click", showAndHide);
addBtn.addEventListener("click", hideQuetionAndgQuiz);
addList.addEventListener("click", add);
buttonCancle.addEventListener("clcik", btnCancle);
buttonSubmit.addEventListener("click", computeScore);

//________________________MAIN______________________________________________
let getContainer = document.querySelector('#container');
let questionAdd = document.querySelector('#questiontext');
let answerAdd1 = document.querySelector('#answer1');
let answerAdd2 = document.querySelector('#answer2');
let answerAdd3 = document.querySelector('#answer3');
let answerAdd4 = document.querySelector('#answer4');
let correctAn = document.querySelector('#corectAnswer');
let domAns = document.querySelectorAll('.cardAns');
let containersQuiz = document.querySelector(".containerQuiz");
displayQuestions();