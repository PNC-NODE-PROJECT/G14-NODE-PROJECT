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

//__________________________Show score___________________________
// function showScore(){
//     let score = document.querySelector(".score");
//     let label = document.querySelectorAll('input[type="radio"]');
//     console.log(label);
// }




// function getScores(){
//     let url = "http://localhost:80/api/questions";
//     axios.get(url)
//     .then((respone)=>{
//         let data = respone.data;
//         showScore();
//     })
// }

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


//________________________MAIN______________________________________________
let getContainer = document.querySelector('#container');
let questionAdd = document.querySelector('#questiontext');
let answerAdd1 = document.querySelector('#answer1');
let answerAdd2 = document.querySelector('#answer2');
let answerAdd3 = document.querySelector('#answer3');
let answerAdd4 = document.querySelector('#answer4');
let correctAn = document.querySelector('#corectAnswer');

displayQuestions();