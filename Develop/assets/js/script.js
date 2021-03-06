/**
* @author  Cristobal A Barberis
* @version 0.1, 07/02/22
*/

// globals
var time = 150;
var questionNum = 0;
var countdown = null;
var scores = [];

// main query selectors
var homeEl = document.querySelector("#home");
var actionsEl = document.querySelector("#actions");
var quizContentEl = document.querySelector("#question");
var formEl = document.querySelector("#score-form-section");
var messageSectionEl = document.querySelector(".result");
var resultMessageEl = document.querySelector("#message");

// timer
function setTimer() {
  document.getElementById("tm").textContent = time;
  if (time < 1) {
    endQuiz();
  }
  time--;
}

// end quiz routing
function endQuiz() {
  clearInterval(countdown);
  if (time < 1){
    localStorage.setItem('last-score', 'zero');
    window.location.replace("scores.html");
  }else{
    scoreForm();
  }
}

// main buttons handler
var buttonHandler = function (event) {
  questionNum = 0;
  var targetEl = event.target;
  if (targetEl.matches("#start")) {
    countdown = setInterval(setTimer, 1000);
    startQuestions();
  }
  if (targetEl.matches("#back-to-home")) {
    window.location.replace("index.html");
  }
  if (targetEl.matches("#clear-score")) {
    localStorage.removeItem("score");
    window.location.reload();
  }
};

// quiz question routine
var startQuestions = function(result) {
  homeEl.style.display = 'none';
  if (result){
    displayMessage(result);
  }else{
    displayMessage();
  } 
  if (time > 0 && questionNum + 1 <= quiz.length) {
    constructQuestion(questionNum);
  }else{
    endQuiz();
  }
} 

// quiz question constructor
var constructQuestion = function (index) {
  // questionContentEl.
  var questionInfoEl = document.createElement("div");
  questionInfoEl.className = "quiz";
  questionInfoEl.innerHTML = "<h2>" + quiz[index].question;
  quizContentEl.appendChild(questionInfoEl);
  var questionOptionsEl = document.createElement("div");
  questionOptionsEl.className = "options";
  quizContentEl.appendChild(questionOptionsEl);

  // options button generator
  for (var i = 0; i < quiz[index].options.length; i++) {
    var option = quiz[index].options[i];
    var optionEl = document.createElement("buttom");
    optionEl.setAttribute("data-question-id", index);
    optionEl.setAttribute("data-answer", option);
    optionEl.className = "btn opt";
    optionEl.textContent = (i+1) + ". " + option;
    questionOptionsEl.appendChild(optionEl);
  }
  // local listener (don't move to the end)
  quizContentEl.addEventListener("click", optionsButtonHandler);  

}

// quiz option handler and solution check
var optionsButtonHandler = function(event) {
  // var questionId = event.target.getAttribute('data-question-id');
  var targetEl = event.target;
  if (targetEl.matches(".btn")) {
    var userAnswer = event.target.getAttribute('data-answer');
    if (userAnswer == quiz[questionNum].answer) {
      var resullt = "Correct!"
    }else{
      time = time - 10;
      var resullt = "Wrong!"
    }
    questionNum++
    var questionInfoEl = document.querySelector(".quiz");
    var questionOptionsEl = document.querySelector(".options");
    quizContentEl.removeChild(questionInfoEl);
    quizContentEl.removeChild(questionOptionsEl);
    startQuestions(resullt);
  }
}

// score user form starter
var scoreForm = function(){
  homeEl.style.display = "none";
  quizContentEl.style.display = "none";
  formEl.style.display = "block";
  // local listener
  formEl.addEventListener("submit", scoreFormHandler);
  var finalScoreEl = document.querySelector("#score");
  finalScoreEl.textContent = time + 1;
}

// score form response handler / local storage record
var scoreFormHandler = function (event) {
  event.preventDefault();
  var initialsInput = document.querySelector("input[name='initials']").value;
  var scoreHistory = localStorage.getItem("score");
  if(scoreHistory){
    scores = JSON.parse(scoreHistory);
  }
  if (initialsInput.length > 0){
    var newScore = {'user': initialsInput, 'score':time};
    scores.push(newScore);
    localStorage.setItem('score', JSON.stringify(scores));
    window.location.replace("scores.html");
  }
}

// display message at the bottom / timeout
var displayMessage = function(message) {
  if(message){
    resultMessageEl.textContent = message;
    messageSectionEl.style.display = "block";
    setTimeout(function(){
      noneDisplayMessage();
    }, 5000);
  }else{
    noneDisplayMessage();
  }
}

// delete message
var noneDisplayMessage = function(message) {
  resultMessageEl.textContent = "";
  messageSectionEl.style.display = "none";
}

// buttons section listener
actionsEl.addEventListener("click", buttonHandler);
