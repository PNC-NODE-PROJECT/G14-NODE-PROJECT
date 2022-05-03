// _____________________Data___________________
// _____________________Functions__________________
// Display the list of question on the DOM
// @param questions - the list of questions
//

// global variable with list of questions
dataOfQuiz = [];

//___________________Display Question_______________________________
function refreshDomElement(questions) {
    while (getContainer.firstChild) {
        getContainer.removeChild(getContainer.lastChild)
    }
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

let containersQuiz = document.querySelector(".containersQuiz");

function playQuiz(questions) {
    while (containersQuiz.firstChild) {
        containersQuiz.removeChild(containersQuiz.lastChild);
    }
    for (let i = 0; i < questions.length; i++) {
        let index = i + 1;
        let containerQuestion = document.createElement("div");
        containerQuestion.className = "containerQuestions";
        let domQuestion = document.createElement("h3");
        domQuestion.innerHTML = questions[i].questionTitle;
        containerQuestion.appendChild(domQuestion);

        let answer = document.createElement("div");
        answer.className = "answers";
        let label1 = document.createElement("label");
        let p1 = document.createElement("p");
        p1.textContent = questions[i].answers["a"];
        let answer1 = document.createElement("input");
        p1.id = "a" + index
        answer1.setAttribute("type", "radio");
        answer1.setAttribute("name", questions[i].id);
        answer1.setAttribute("value", "a");

        let answer2 = document.createElement("input");
        let label2 = document.createElement("label");
        let p2 = document.createElement("p");
        p2.id = "b" + index
        p2.textContent = questions[i].answers["b"];
        answer2.setAttribute("type", "radio");
        answer2.setAttribute("name", questions[i].id);
        answer2.setAttribute("value", "b");

        let answer3 = document.createElement("input");
        let label3 = document.createElement("label");
        let p3 = document.createElement("p");
        p3.textContent = questions[i].answers["c"];
        p3.id = "c" + index
        answer3.setAttribute("type", "radio");
        answer3.setAttribute("name", questions[i].id);
        answer3.setAttribute("value", "c");

        let answer4 = document.createElement("input");
        let label4 = document.createElement("label");
        let p4 = document.createElement("p");
        p4.id = "d" + index
        p4.textContent = questions[i].answers["d"];
        answer4.setAttribute("type", "radio");
        answer4.setAttribute("name", questions[i].id);
        answer4.setAttribute("value", "d");

        label1.appendChild(answer1);
        answer.appendChild(label1);
        label1.appendChild(p1);

        label2.appendChild(answer2);
        answer.appendChild(label2);
        label2.appendChild(p2);

        label3.appendChild(answer3);
        answer.appendChild(label3);
        label3.appendChild(p3);

        label4.appendChild(answer4);
        answer.appendChild(label4);
        label4.appendChild(p4);
        containerQuestion.appendChild(answer);
        containersQuiz.appendChild(containerQuestion)

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
function add(event) {
  
    let url = "/api/questions/create";
    let question =  questionAdd.value;
    let answer1 =  answerAdd1.value;
    let answer2 =  answerAdd2.value;
    let answer3 =  answerAdd3.value;
    let answer4 =  answerAdd4.value;
    let corrected = correctAn.value;
   
    if(question===""|| answer1===""||answer2===""||answer3===""||answer4==""||corrected===""){
        window.alert("Please will all the input");
        console.log("question", question)
        event.preventDefault();
    }else{
        let body = {
            questionTitle: "Question : " + question,
            answers: {
                a: "A : " +answer1,
                b: "B : " +answer2,
                c: "C : " +answer3,
                d: "D : " +answer4
            },
            correctAnswer: corrected
        }
        axios.post(url, body)
        .then((result) => {
            console.log(body);
        })

    }
   
        

}
//______________Delete the question_____________
function deleteQ(event) {
    if (event.target.id === "delete") {
        let id = event.target.parentElement.parentElement.id;
        let url = "/api/questions/delete/" + id;
        axios.delete(url)
            .then((results) => {
                console.log(results);
                displayQuestions()
            })
    }
}
// _____________Edit the question____________
btnEdit = document.querySelector('.btn-edit');
hide(btnEdit)

function editQ(id) {
    let URL = "/api/questions/edit/" + id;
    question = questionAdd.value;
    answer1 = answerAdd1.value;
    answer2 = answerAdd2.value;
    answer3 = answerAdd3.value;
    answer4 = answerAdd4.value;
    corrected = correctAn.value;

    if (question != "" && answer1 != "" && answer2 != "" && answer3 != "" && answer4 != "") {
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
        axios.patch(URL, body).then((result) => {
            console.log(result);
        })
    }
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

function computeScore(answers) {
    let url = "http://localhost:80/api/questions";
    axios.get(url)
        .then((response) => {
            let array_questions = response.data;
            let score = document.querySelector(".score");
            let labels = document.querySelectorAll('input[type="radio"]');
            let userChoice = 0;
            let array_user_ans = []
            for (let i = 0; i < labels.length; i++) {
                if (labels[i].checked) {
                    userChoice++
                    array_user_ans.push(labels[i].value);
                    console.log(labels[i].value);
                }
            }
            if (userChoice === array_questions.length) {
                let i = 1;
                for (let k = 0; k < array_questions.length; k++) {
                    let id = array_user_ans[k];
                    let iid = "#" + id + i;
                    console.log(iid);
                    if (array_questions[k].correctAnswer === array_user_ans[k]) {
                        scoreusers++;
                        score.textContent = scoreusers;
                        let a = document.querySelector(iid);
                        console.log(a);
                        a.style.color = "green";
                    } else {
                        let a = document.querySelector(iid);
                        console.log(a);
                        a.style.color = "red";
                    }
                    i += 1;

                }
                showScoreForUser.style.display = "block";
                displayUserName.textContent = getUserPlay.value;
                buttonSubmit.style.display = "none";
                inputUsersName.style.display = "none";

            } else {
                alert("You should choose all questions")
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

//___________show correction_____________
function showCorrection() {
    inputUsersName.style.display = "block";
    title.style.display = "none";
    nav.style.display = "none";
    showScoreForUser.style.display = "none";
    // buttonShowCorrections.style.display = "none";
}
// ________________________Main________________________
let startQuiz = document.querySelector("#startQuiz");
let nav = document.querySelector(".navbar");
let getInput = document.querySelectorAll('input[type="radio"]');
let hide_Quiz = document.getElementById("create_question");
let show_Quiz = document.getElementById("play_quiz");
let addBtn = document.getElementById("btnAdd");
let formAdd = document.querySelector('.formToAdd');
let addList = document.querySelector('.addlist');
let title = document.querySelector('.title');
let inputUsersName = document.querySelector(".userName");
let showScoreForUser = document.querySelector(".header");
let buttonSubmit = document.querySelector(".btn-submit");
let buttonShowCorrections = document.querySelector(".showCorrection")
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
buttonShowCorrections.addEventListener("click", showCorrection);
// buttonSubmit.addEventListener("click", submitQuiz);
displayQuestions();