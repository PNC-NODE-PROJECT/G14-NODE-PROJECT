
// _____________________Data___________________
// _____________________Functions__________________
// Display the list of question on the DOM
// @param questions - the list of questions
//

//___________________Display Question_______________________________
function refreshDomElement(questions){
    let card = document.createElement("div");
    card.className='question-container';
    for(let quesion of questions){
        let title = document.createElement("h3");
        title.textContent = quesion.questionTitle;
        let ans1 = document.createElement("p");
        ans1.textContent = quesion.answers.a;
        let ans2 = document.createElement("p");
        ans2.textContent = quesion.answers.b;
        let ans3 = document.createElement("p");
        ans3.textContent = quesion.answers.c;
        let ans4 = document.createElement("p");
        ans4.textContent = quesion.answers.d;

        card.appendChild(title);
        card.appendChild(ans1);
        card.appendChild(ans2);
        card.appendChild(ans3);
        card.appendChild(ans4);
            
        getContainer.appendChild(card);
    }
}

function displayQuestions() {
    axios.get("http://localhost:80/api/questions").then((response)=>{
        let dataOfQuiz = response.data;
        refreshDomElement(dataOfQuiz);
        
    });
};

//_____________________Add the question_________________________________
function add(){
    let url = "http://localhost:80/api/questions/create";
    let question = questionAdd.value;
    let answer1 = answerAdd1.value;
    let answer2 = answerAdd2.value;
    let answer3 = answerAdd3.value;
    let answer4 = answerAdd4.value;
    let corrected = correctAn.value;
    let body = {questionTitle: question,answers:{a: answer1,b:answer2,c:answer3,d:answer4},correctAnswer: corrected}
    axios.post(url,body)
    .then((result)=>{
        console.log(body);
    })
}    

//_______________Show and hide __________________________________
function showAndHide(event){
    if(event.target.textContent ==="Play quiz"){
        let oldContainer = document.getElementsByClassName("containersQuiz");
        if (oldContainer.length > 0){
            oldContainer[0].remove()
        }
        event.preventDefault();
        let containers=document.querySelector('.container');
        if (containers != null){
            containers.style.display='none';
        }
        addBtn.style.display = "none";
        formAdd.style.display='none';
        // userPlayQuiz(arrAnswer);
        inputUsersName.style.display = "block";
        buttonSubmit.style.display = "block";
        showScore.style.display = "none";
        show_Quiz.style.borderBottom = "5px solid";
        show_Quiz.style.borderBottomColor = "#0E578C";
        hide_Quiz.style.borderBottom = "none";
    }

    if (event.target.textContent === "Edit Quiz"){
        let containers=document.querySelector('.container');
        if (containers != null){
            containers.style.display='none';
        }
        addBtn.style.display = "block";
        formAdd.style.display='none';
        let usersPlay = document.querySelector(".userName"); 
        usersPlay.style.display = "none";
        buttonSubmit.style.display = "none";
        showScore.style.display = "none";
        hide_Quiz.style.borderBottom = "5px solid";
        hide_Quiz.style.borderBottomColor = "#0E578C";
        show_Quiz.style.borderBottom = "none";
    }
}

function hideQuetionAndgQuiz(event){
    event.preventDefault();
    var containers=document.querySelector('.container');
    if (containers != null){
        containers.style.display='none';
    }
    addBtn.style.display = "none";
    formAdd.style.display='block';
    var message=document.querySelector('.alert');
    message.style.display='none';
}

function btnCancle(event){
    event.preventDefault();
    getContainer.style.display = "block";
}


// _________________________savedata______________________________
function saveData(){
    localStorage.setItem("arrAnswer" ,JSON.stringify(arrAnswer))
}
// _______________________________Button Submit_______________________
let btnSubmit = document.createElement('button');
btnSubmit.classList.add('btn-submit');
btnSubmit.textContent = "Submit";
document.body.appendChild(btnSubmit);
// _______________________Increment score_______________________________
let results = 0;
let scores = document.querySelector(".score");
function increment_Score(event){
    event.preventDefault();
    let allAnswers = document.getElementsByTagName("lable");
    console.log(allAnswers);
}
// ________________________Variable_______________________________
let startQuiz = document.querySelector("#startQuiz");
let hide_Quiz = document.getElementById("create_question");
let show_Quiz = document.getElementById("play_quiz");
let addBtn = document.getElementById("btnAdd");
let formAdd=document.querySelector('.formToAdd');
let addList=document.querySelector('.addlist');
let inputUsersName = document.querySelector(".userName");
let showScore = document.querySelector(".header");
let buttonSubmit = document.querySelector(".btn-submit");
let buttonCancle = document.querySelector("#cancel");
// _____________________Style_____________________________________________________
formAdd.style.display='none';
inputUsersName.style.display='none';
buttonSubmit.style.display='none';
// showScore.style.display='none';

// _____________________Show and Hide Quiz________________________________________
document.addEventListener("click", showAndHide);
addBtn.addEventListener("click", hideQuetionAndgQuiz);
addList.addEventListener("click",add);
buttonCancle.addEventListener("clcik", btnCancle);

//________________________MAIN______________________________________________
let getContainer=document.querySelector('#container');
let questionAdd=document.querySelector('#questiontext');
let answerAdd1=document.querySelector('#answer1');
let answerAdd2=document.querySelector('#answer2');
let answerAdd3=document.querySelector('#answer3');
let answerAdd4=document.querySelector('#answer4');
let correctAn = document.querySelector('#corectAnswer');
displayQuestions();