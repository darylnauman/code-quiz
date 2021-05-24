var timerEl = document.getElementById("time-countdown");
var timeLeftEl = document.getElementById("time-left");
var startButton = document.getElementById("start-button");
var questionCardEl = document.getElementById("question-card");

var questionEl = document.getElementById("question");
var optionOneEl = document.getElementById("opt-1");
var optionTwoEl = document.getElementById("opt-2");
var optionThreeEl = document.getElementById("opt-3");
var optionFourEl = document.getElementById("opt-4");

var timeLeft = 5;

var roundOne = {
   question: "What does CSS stand for?",
   optionOne: "Christmas Style Santas",
   optionTwo: "Chrome Super Saver",
   optionThree: "Cash Savings System",
   optionFour: "Cascading Style Sheets",
   correctAnswer: 4
};

function renderQuestionCard () {
    console.log(roundOne);
    questionEl.textContent = roundOne.question;
    optionOneEl.textContent = roundOne.optionOne;
    optionTwoEl.textContent = roundOne.optionTwo;
    optionThreeEl.textContent = roundOne.optionThree;
    optionFourEl.textContent = roundOne.optionFour;
}

function startTimer() {
    renderQuestionCard();
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