var time = 150;
var countdown = null;
var homeContentEl = document.querySelector("#home");
var quizContentEl = document.querySelector("#question");
console.log(quiz);

function setTimer() {
  document.getElementById("tm").textContent = time;
  if (time < 1) {
    stopCountDown();
  }
  time--;
}

function stopCountDown() {
    clearInterval(countdown);
}

var taskButtonHandler = function (event) {
  // get target element from event
  var targetEl = event.target;
  if (targetEl.matches("#start")) {
    countdown = setInterval(setTimer, 1000);
    startQuestions();
  }
};

var startQuestions = function() {
  homeContentEl.style.display = 'none';
  constructQuestion(0);
}

var constructQuestion = function (index) {
  // questionContentEl.
  var questionInfo = document.createElement("div");
  questionInfo.className = "quiz";
  questionInfo.innerHTML = "<h2>" + quiz[index].question;
  quizContentEl.appendChild(questionInfo);

  var questionOptionsEl = document.createElement("div");
  questionOptionsEl.className = "options";
  quizContentEl.appendChild(questionOptionsEl);


  for (var i = 0; i < quiz[index].options.length; i++) {
    var option = quiz[index].options[i];
    var optionEl = document.createElement("buttom");
    optionEl.setAttribute("data-question-id", index);
    optionEl.setAttribute("data-answer", option);
    optionEl.className = "btn question";
    optionEl.textContent = (i+1) + ". " + option;
    questionOptionsEl.appendChild(optionEl);
  }


  quizContentEl.addEventListener("click", optionsButtonHandler);


}

var optionsButtonHandler = function(event) {
  var questionId = event.target.getAttribute('data-question-id');
  var userAnswer = event.target.getAttribute('data-answer');

  if (userAnswer == quiz[questionId].answer) {
    console.log("Correcto");
  }else{
    time = time - 15;
  }


}



// checkAnswer = function(question) {
//   if (question.answer == ) {
    
//   }
// }

homeContentEl.addEventListener("click", taskButtonHandler);
