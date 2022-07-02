var time = 150;
var countdown = null;
var pageContentEl = document.querySelector("#content");


function setTimer() {
  document.getElementById("tm").textContent = time;
  if (time == 0) {
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
  console.log('start');
  if (targetEl.matches("#start")) {
    countdown = setInterval(setTimer, 1000);
  }
};


pageContentEl.addEventListener("click", taskButtonHandler);
