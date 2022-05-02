// _____________________Data___________________
// _____________________Functions__________________
// Display the list of question on the DOM
// @param questions - the list of questions
//

// global variable with list of questions
dataOfQuiz = [];

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
        // Edit Button
        let editQuestion = document.createElement('i');
        editQuestion.className = "fa fa-edit";
        editQuestion.id = "edit";
        editQuestion.addEventListener("click", showEditForm);
        editDeleteBox.appendChild(editQuestion);
        // Delete Button
        let deleteQuestion = document.createElement("i");
        deleteQuestion.className = "fa fa-trash";
        deleteQuestion.id = "delete";
        deleteQuestion.addEventListener("click", deleteQ);
        editDeleteBox.appendChild(deleteQuestion);

        cardBox.appendChild(card);
        cardBox.appendChild(editDeleteBox);
        getContainer.appendChild(cardBox);
    }
}

let hide = (element) => {
    element.style.display = "none";
}
let show = (element) => {
    element.style.display = "block";
}


function displayQuestions() {
    axios.get("/api/questions").then((response) => {
        dataOfQuiz = response.data;
        refreshDomElement(dataOfQuiz);
    });
};

//_____________Play quiz_______________________

function playQuiz(questions) { 
    let containersQuiz = document.createElement("div");
    containersQuiz.className = "containersQuiz";
    inputUsersName.appendChild(containersQuiz);

    for (let question of questions) {
        let domQuestion = document.createElement("h3");
        domQuestion.innerHTML = question.questionTitle;
        containersQuiz.appendChild(domQuestion);

        let domAnswers = question.answers;
        console.log(domAnswers);
        for (let answer in domAnswers) {
            let ol = document.createElement("ol");
            containersQuiz.appendChild(ol);
            let li = document.createElement("li");
            ol.appendChild(li);
            let radio = document.createElement("input");
            radio.setAttribute("type", "radio");
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
            playQuiz(data);
        })
}

//_____________________Add the question_________________________________
function add() {
    let url = "/api/questions/create";
    let question ="Question : "+ questionAdd.value;
    let answer1 = "A : "+answerAdd1.value;
    let answer2 = "B : "+answerAdd2.value;
    let answer3 = "C : "+answerAdd3.value;
    let answer4 = "D : "+answerAdd4.value;
    let corrected = correctAn.value;
    let body = { questionTitle: question, answers: { a: answer1, b: answer2, c: answer3, d: answer4 }, correctAnswer: corrected }
    axios.post(url, body)
        .then((result) => {
            console.log(body);
        })
}
//______________Delete the question_____________
function deleteQ(event) {
    if (event.target.id === "delete") {
        let id = event.target.parentElement.parentElement.id;
        let url = "/api/questions/delete/" + id;
        axios.delete(url)
            .then((results) => {
                console.log(results);
            })
    }
}
// _____________Edit the question____________
btnEdit = document.querySelector('.btn-edit');
hide(btnEdit)
function editQ(id) {
    let URL = "/api/questions/edit/" + id;
    for (let datas of dataOfQuiz) {
        question = questionAdd.value;
        answer1 = answerAdd1.value;
        answer2 = answerAdd2.value;
        answer3 = answerAdd3.value;
        answer4 = answerAdd4.value;
        corrected =correctAn.value;
    }
    let body = {questionTitle: question,
        answers:{a: answer1,b:answer2,c:answer3,d:answer4},
        correctAnswer: corrected}
    axios.patch(URL, body).then((result) => {
        console.log(result);
    })
}
function showEditForm(event) {
    if (event.target.id === "edit") {
        let id = event.target.parentElement.parentElement.id;
        for (let datas of dataOfQuiz) {
            let theId = datas.id;
            if (theId === id) {
                show(formAdd);
                hide(addList);
                hide(getContainer)
                show(btnEdit)
                questionAdd.value = datas.questionTitle;
                answerAdd1.value = datas.answers.a;
                answerAdd2.value = datas.answers.b;
                answerAdd3.value = datas.answers.c;
                answerAdd4.value = datas.answers.d;
                correctAn.value = datas.correctAnswer;
            }
        }
        btnEdit.addEventListener('click', (event) => {
            editQ(id);
        });
    }
}


//___________________Show score__________________________________
let scoreusers = 0
function computeScore(answers){
    let url = "http://localhost:80/api/questions";
    axios.get(url)
    .then((response) => {
        let array_questions = response.data;
        let score = document.querySelector(".score");
        let labels = document.querySelectorAll('input[type="radio"]');
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
                    score.textContent = scoreusers;
                }
            }
            
        }else{
            alert("Should choose all questions")
            array_user_ans = [];
        }
        console.log(scoreusers);
    })
}
//_______________Show and hide __________________________________
function showAndHide(event) {
    if (event.target.textContent === "Edit Quiz") {
        if (getContainer != null) {
            getContainer.style.display = 'none';
        }
        addBtn.style.display = "block";
        formAdd.style.display = 'none';
        buttonSubmit.style.display = "none";
        
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
        showScoreForUser.style.display = "none";
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
// ______________________Button Submit_______________________
let btnSubmit = document.createElement('button');
btnSubmit.classList.add('btn-submit');
btnSubmit.textContent = "Submit";
document.body.appendChild(btnSubmit);


//________________________Submit quiz________________________
function submitQuiz(){
    showScoreForUser.style.display = "block";
    displayUserName.textContent = getUserPlay.value;
    console.log(displayUserName);
    buttonSubmit.style.display = "none";
    inputUsersName.style.display= "none";
}
// ________________________Main________________________
let startQuiz = document.querySelector("#startQuiz");
let hide_Quiz = document.getElementById("create_question");
let show_Quiz = document.getElementById("play_quiz");
let addBtn = document.getElementById("btnAdd");
let formAdd = document.querySelector('.formToAdd');
let addList = document.querySelector('.addlist');
let inputUsersName = document.querySelector(".userName");
let showScoreForUser = document.querySelector(".header");
let buttonSubmit = document.querySelector(".btn-submit");
let getUserPlay = document.querySelector('.name');
let displayUserName = document.querySelector(".getUserName");
let buttonCancle = document.querySelector("#cancel");
let getContainer = document.querySelector('#container');
let questionAdd = document.querySelector('#questiontext');
let answerContainer = document.querySelector("#answer-container");
let answerAdd1 = document.querySelector('#answer1');
let answerAdd2 = document.querySelector('#answer2');
let answerAdd3 = document.querySelector('#answer3');
let answerAdd4 = document.querySelector('#answer4');
let correctAn = document.querySelector('#corectAnswer');
// _____________________Style_______________________________
formAdd.style.display = 'none';
inputUsersName.style.display = 'none';
buttonSubmit.style.display = 'none';

// _____________________Show and Hide Quiz________________________________________
document.addEventListener("click", showAndHide);
addBtn.addEventListener("click", hideQuetionAndgQuiz);
addList.addEventListener("click", add);
buttonCancle.addEventListener("clcik", btnCancle);
buttonSubmit.addEventListener("click", computeScore);
buttonSubmit.addEventListener("click", submitQuiz);
displayQuestions();