var timerEl = document.getElementById("time-countdown");
var timeLeftEl = document.getElementById("time-left");
var startButton = document.getElementById("start-button");
var questionCardEl = document.getElementById("question-card");

var timeLeft = 5;

function startTimer() {
    var timeInterval = setInterval(function() {
        timeLeftEl.textContent = timeLeft;
        
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            clearInterval(timeInterval);
        }
    }, 1000);
}

startButton.addEventListener("click", startTimer);

questionCardEl.addEventListener("click", function(event) {
    var element = event.target;
   
    if(element.matches(".option")) {
        var optionSelected = element.getAttribute("data-option");
        console.log(`Option selcted: ${optionSelected}`);
    }
});