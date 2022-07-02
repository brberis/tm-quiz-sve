var time = 150;
var questionNum = 0;
var countdown = null;
var scores = [];
var homeEl = document.querySelector("#home");
var actionsEl = document.querySelector("#actions");
var quizContentEl = document.querySelector("#question");

function setTimer() {
  document.getElementById("tm").textContent = time;
  if (time < 1) {
    endQuiz();
  }
  time--;
}

function endQuiz() {
    var scoreHistory = localStorage.getItem("score");
    console.log(scoreHistory);
    if(scoreHistory){
      scores = JSON.parse(scoreHistory);
    }
    var newScore = {'user':'CB', 'score':time};
    scores.push(newScore);
    localStorage.setItem('score', JSON.stringify(scores));
    clearInterval(countdown);
    if (score === 0){
      window.location.replace("scores.html");
    }else{
      scoreForm();
    }
    }



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
    localStorage.clear("score");
    window.location.reload();
  }
};

var startQuestions = function() {
  homeEl.style.display = 'none';
  
  if (time > 0 && questionNum + 1 <= quiz.length) {
    constructQuestion(questionNum);
  }else{
    endQuiz();
  }

} 


var constructQuestion = function (index) {
  // questionContentEl.
  var questionInfoEl = document.createElement("div");
  questionInfoEl.className = "quiz";
  questionInfoEl.innerHTML = "<h2>" + quiz[index].question;
  quizContentEl.appendChild(questionInfoEl);

  var questionOptionsEl = document.createElement("div");
  questionOptionsEl.className = "options";
  quizContentEl.appendChild(questionOptionsEl);


  for (var i = 0; i < quiz[index].options.length; i++) {
    var option = quiz[index].options[i];
    var optionEl = document.createElement("buttom");
    optionEl.setAttribute("data-question-id", index);
    optionEl.setAttribute("data-answer", option);
    optionEl.className = "btn opt";
    optionEl.textContent = (i+1) + ". " + option;
    questionOptionsEl.appendChild(optionEl);
  }


  quizContentEl.addEventListener("click", optionsButtonHandler);  


}

var optionsButtonHandler = function(event) {
  // var questionId = event.target.getAttribute('data-question-id');
  var targetEl = event.target;
  if (targetEl.matches(".btn")) {
    var userAnswer = event.target.getAttribute('data-answer');
    if (userAnswer == quiz[questionNum].answer) {
      console.log("Correcto");
    }else{
      time = time - 15;
    }
    questionNum++
    var questionInfoEl = document.querySelector(".quiz");
    var questionOptionsEl = document.querySelector(".options");
    quizContentEl.removeChild(questionInfoEl);
    quizContentEl.removeChild(questionOptionsEl);
    startQuestions();
  }

}

var scoreForm = function(){

  window.location.replace("scores.html");

}


actionsEl.addEventListener("click", buttonHandler);
