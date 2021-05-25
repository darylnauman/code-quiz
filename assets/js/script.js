var timerEl = document.getElementById("time-countdown");
var timeLeftEl = document.getElementById("time-left");
var startButton = document.getElementById("start-button");
var questionCardEl = document.getElementById("question-card");
var viewHighScoresEl = document.getElementById("view-high-scores");
var highScoresList = document.getElementById("high-scores-list");
var highScoresDiv = document.getElementById("high-scores-div");


var questionEl = document.getElementById("question");
var optionOneEl = document.getElementById("opt-1");
var optionTwoEl = document.getElementById("opt-2");
var optionThreeEl = document.getElementById("opt-3");
var optionFourEl = document.getElementById("opt-4");

var highScores = ["Daryl", "32", "Mike", "51"];

var timeLeft;

var roundOne = {
   question: "What does CSS stand for?",
   optionOne: "Christmas Style Santas",
   optionTwo: "Chrome Super Saver",
   optionThree: "Cash Savings System",
   optionFour: "Cascading Style Sheets",
   correctAnswer: 4
};

function renderQuestionCard () {
    questionEl.textContent = roundOne.question;
    optionOneEl.textContent = roundOne.optionOne;
    optionTwoEl.textContent = roundOne.optionTwo;
    optionThreeEl.textContent = roundOne.optionThree;
    optionFourEl.textContent = roundOne.optionFour;
}

function startTimer() {
    timeLeft = 10;
    startButton.disabled = true;
    highScoresDiv.setAttribute("style", "display: none");

    renderQuestionCard();
    var timeInterval = setInterval(function() {
        timeLeftEl.textContent = timeLeft;
        
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            clearInterval(timeInterval);
            startButton.disabled = false;
        }
    }, 1000);
}

function displayHighScores (event) {
    
    console.log(`Entered displayHighScores on a ${event.type}`);
    highScoresDiv.setAttribute("style", "display: block");
    console.log(`highScoresList: ${highScoresList}`);
    // highScoresList = "";

    questionCardEl.setAttribute("style", "display: none");

    var storedHighScores = JSON.parse(localStorage.getItem("highScores"));

    // checks if localStorage has high scores, if so assigned to local variable
    if (storedHighScores !== null) {
        highScores = storedHighScores;
    }

    for (var i = 0; i < highScores.length; i = i + 2 ) {
        var name = highScores[i];
        var score = highScores[i + 1];

        console.log(`Name: ${name}, Score: ${score}`);

        var li = document.createElement("li");
        li.textContent = `Name: ${name}, Score: ${score}`;
        console.log(li);

        highScoresList.appendChild(li);
    }
}

// Event Listeners


startButton.addEventListener("click", startTimer);

viewHighScoresEl.addEventListener("click", displayHighScores);

questionCardEl.addEventListener("click", function(event) {
    var element = event.target;
   
    if(element.matches(".option")) {
        var optionSelected = element.getAttribute("data-option");
        console.log(`Option selcted: ${optionSelected}`);
    }
});

// remember to --> startButton.disabled = false;
