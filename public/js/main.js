
// _____________________Data___________________
let arrAnswer = [
    {
    question: "I were .....(play) football when you arived .",
    answers: {
        a: "played",
        b: "plaied",
        c: "playing",
        d: "play"
    },
    correctAnswers: "playing"
},
{
    question: " which is subordinating  conjunction ?",
    answers: {
        a: "when",
        b: "and",
        c: "on",
        d: "yet"
    },
    correctAnswers: "when"
},
{
    question: "what is coordinating conjunction ?",
    answers: {
        a: "in",
        b: "on",
        c: "yet",
        d: "if"
    },
    correctAnswers: "yet"
},
{
    question: "which is reported speech ?",
    answers: {
        a: "she was cooking last monthday.",
        b: "He,said that 'his father is 79 year old.",
        c: "she had been arrived when stoped play football.",
        d: "I am doing home work ."
    },
    correctAnswers: "He,said that 'his father is 79 year old."
}

]
// _____________________Functions__________________
// Display the list of question on the DOM
// @param questions - the list of  questions
//
function displayQuestions(questions) {
    let getContainer=document.querySelectorAll('.container');
    for (let contain of getContainer){
        contain.remove();
    }
    let containers = document.createElement("div");
    containers.className='container';
    for (let question in questions) {
        let ol = document.createElement("ol");
        containers.appendChild(ol);
        let questionTitle = document.createElement("p");
        questionTitle.className="questionTitle";
        questionTitle.textContent = arrAnswer[question].question;
        ol.appendChild(questionTitle);

        
        let answersOfQuestion = arrAnswer[question].answers;
        for (let answer in answersOfQuestion) {
            let li = document.createElement("li");
            ol.appendChild(li);
            let label = document.createElement("label");
            let image = document.createElement("img");
            label.textContent = answersOfQuestion[answer];
            label.style.fontSize= "18px";
            // if (arrAnswer[question].correctAnswers === answersOfQuestion[answer]){
            //     image.src = "images/right.png";
                
            // }
            // else{
            //     image.src = "images/wrong.png";
            // }
            li.appendChild(label);
            // li.appendChild(image);
        }
        // ________________________________Icon ______________________________
        // let ulOfIcon = document.createElement('ul');
        // let iconDelete = document.createElement("li");
        // let iconEdit = document.createElement("li");
        // iconDelete.className = " iconDelete fa fa-trash ";
        // iconDelete.style.color = "white";
        // iconEdit.className = " iconEdit fa fa-edit ";
        // ulOfIcon.appendChild(iconDelete);
        // ulOfIcon.appendChild(iconEdit);
        // questionTitle.appendChild(ulOfIcon);
        document.body.appendChild(containers);
    }
}
function userPlayQuiz(questions){
    let containersQuiz = document.createElement("div");
    containersQuiz.className = "containersQuiz";
    inputUsersName.appendChild(containersQuiz);
    for (let question in questions) {
        let ol = document.createElement("ol");
        ol.className="olQuestion";
        ol.style.border="3px solid black";
        ol.style.marginBottom="25px";
        containersQuiz.appendChild(ol);
        let questionTitle = document.createElement("p");
        questionTitle.className="questionTitle"
        questionTitle.textContent = arrAnswer[question].question;
        ol.appendChild(questionTitle);

        let answersOfQuestion = arrAnswer[question].answers;

        for (let answer in answersOfQuestion) {
            let li = document.createElement("li");
            ol.appendChild(li);

            let radio = document.createElement("input");
            radio.setAttribute("type", "radio");
            radio.setAttribute("name", "answer" + question);
            radio.setAttribute("value", answer);
            li.appendChild(radio);
        
            let label = document.createElement("label");
            label.textContent = answersOfQuestion[answer];

            li.appendChild(label)
        }
    }
}
/// remove frome data -----------------------------------------------
function delete_Quiz(event) {
    if (event.target.className === "fa fa-trash") {
        let myIconce=event.target.parentElement.textContent;
        console.log(myIconce);
        for(let index in arrAnswer){
            if(arrAnswer[index].question===myIconce){
                arrAnswer.splice(index,1);
                displayQuestions(arrAnswer);  
            }
        }
    } 
}
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
        userPlayQuiz(arrAnswer);
        inputUsersName.style.display = "block";
        buttonSubmit.style.display = "block";
        showScore.style.display = "none";
        show_Quiz.style.borderBottom = "5px solid";
        show_Quiz.style.borderBottomColor = "#0E578C";
        hide_Quiz.style.borderBottom = "none";
    }

//===============================================================


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
function addDataTolist(event){
    event.preventDefault();
    //get element from form-------------------------------------------
    let questionAdd=document.querySelector('#questiontext').value;
    let answerAdd1=document.querySelector('#answer1').value;
    let answerAdd2=document.querySelector('#answer2').value;
    let answerAdd3=document.querySelector('#answer3').value;
    let answerAdd4=document.querySelector('#answer4').value;
    //let listCorect=document.querySelector('#corectAnswer');
    // create opption____________________________________________________

    let opption1=document.querySelector('#option1');
    opption1.value=answerAdd1;
    let opption2=document.querySelector('#option2');
    opption2.value=answerAdd2;
    let opption3=document.querySelector('#option3');
    opption3.value=answerAdd3;
    let opption4=document.querySelector('#option4');
    opption4.value=answerAdd4

    let corection=document.querySelector('#corectAnswer').value;

    //  to check if the same question ----------------------------------
    let checkQuestion=true;
    for (let value of arrAnswer){
        if(value.question===questionAdd){
            checkQuestion=false;
        }
    }
    if (questionAdd.length>0 && answerAdd1.length>0 && answerAdd2.length>0 && answerAdd3.length>0 && answerAdd4.length>0 && corection.length>0 && checkQuestion )  {
        let dataObject={};
        let answerlist={};
        answerlist.a=answerAdd1;
        answerlist.b=answerAdd2;
        answerlist.c=answerAdd3;
        answerlist.d=answerAdd4;
        dataObject.question=questionAdd;
        dataObject.answers=answerlist;
        dataObject.correctAnswers=corection
        arrAnswer.push(dataObject);

        formAdd.style.display='none';
        addBtn.style.display='block';
        displayQuestions(arrAnswer);
    }
    else{
        var message=document.querySelector('.alert');
        message.style.display='block';
    }
        saveData();
}
function btnCancle(event){
    event.preventDefault();
    getContainer.style.display = "block";
}

function submitScore(){
    showScore.style.display = "block";
    buttonSubmit.style.display = "none";
}
// _______________________Increment score_______________________________

function showScores(){
    let score = document.querySelector(".score");
    
    let label = document.querySelectorAll('input[type="radio"]');
    correctAns = "";
    noTrue = true;
    let result = 0;
    for(let value of label){
        if(value.checked){
            isOnetrue= false;
            for(let answer of arrAnswer){
                if(value.nextElementSibling.textContent === answer.correctAnswers && isOnetrue===false){
                    result += 1;
                    value.nextElementSibling.style.color ="green";
                    score.textContent = result;
                    noTrue=false;
                    isOnetrue= true;
                }
                else if (isOnetrue===false){
                    value.nextElementSibling.style.color ="red";
                }
            }  
        }
        
    }
    if(noTrue){
        score.textContent=result;
    }

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

// _____________________Main___________________
formAdd.style.display='none';
inputUsersName.style.display='none';
buttonSubmit.style.display='none';
showScore.style.display='none';
displayQuestions(arrAnswer);
document.addEventListener('click', delete_Quiz)
// _____________________Show and Hide Quiz________________________________________
document.addEventListener("click", showAndHide);
addBtn.addEventListener("click", hideQuetionAndgQuiz);
addList.addEventListener("click",addDataTolist);
buttonSubmit.addEventListener("click", submitScore);
buttonSubmit.addEventListener("click", showScores);
buttonCancle.addEventListener("clcik", btnCancle);

