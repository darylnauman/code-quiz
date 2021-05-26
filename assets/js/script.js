var timerEl = document.getElementById("time-countdown");
var timeLeftEl = document.getElementById("time-left");
var startButton = document.getElementById("start-button");
var questionCardEl = document.getElementById("question-card");
var viewHighScoresEl = document.getElementById("view-high-scores");
var highScoresList = document.getElementById("high-scores-list");
var highScoresDiv = document.getElementById("high-scores-div");
var feedbackEl = document.getElementById("feedback");
var gameIntroEl = document.getElementById("game-intro");

var questionEl = document.getElementById("question");
var answerA = document.getElementById("answerA");
var answerB = document.getElementById("answerB");
var answerC = document.getElementById("answerC");
var answerD = document.getElementById("answerD");

var highScores = [
    {
        name: "Daryl",
        score: "32"
    }, 
    {   name: "Mike",
        score: "51"
    }
];

var timeLeft;
var round;
var userScore;
var userName;

var myQuestions = [
    {
        question: "What does CSS stand for?",
        answers: {
            a: "Christmas Style Santas",
            b: "Chrome Super Saver",
            c: "Cash Savings System",
            d: "Cascading Style Sheets"
        },
        correctAnswer: "d"
    },
    {
        question: "What does HTML stand for?",
        answers: {
            a: "HyperText Markup Language",
            b: "HyperTerminal Method Library",
            c: "Holistic Terminal Machine List",
            d: "Home Testing Mainenance Local"
        },
        correctAnswer: "a"
    },
    {
        question: "The localStorage property allows key/values pairs to be saved here:",
        answers: {
            a: "On a remote server",
            b: "On an external hard drive",
            c: "Within the browser",
            d: "Inside a safe"
        },
        correctAnswer: "c"
    },
    {
        question: "A CSS pseudo-element is a:",
        answers: {
            a: "keyword added to a selector that lets you style a specific part of the selected element(s)",
            b: "keyword that indicates that an element is fake and can be ignored",
            c: "keyword added to a selector that specifies a special state of the selected element(s)",
            d: "None of the above"
        },
        correctAnswer: "a"
    },
    {
        question: "Which of the following is NOT true?",
        answers: {
            a: "JavaScript is a programming language",
            b: "JavaScript was developed in 2005",
            c: "As of 2021, JavaScript is considered one of the core technologies of the web",
            d: "JavaScript is weakly typed"
        },
        correctAnswer: "b"
    }
];

function startTimer() {
    round = 0;
    timeLeft = 60;

    startButton.disabled = true;
    highScoresDiv.setAttribute("style", "display: none");
    gameIntroEl.setAttribute("style", "display: none");
    
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

    return;
}

function renderQuestionCard() {
    questionCardEl.setAttribute("style", "display: block");

    questionEl.textContent = myQuestions[round].question;
    answerA.textContent = myQuestions[round].answers.a;
    answerB.textContent = myQuestions[round].answers.b;
    answerC.textContent = myQuestions[round].answers.c;
    answerD.textContent = myQuestions[round].answers.d;
    
    return;
}

function checkAnswer(event) {
    event.preventDefault();

    var element = event.target;
       
    if(element.matches(".answer")) {
        var userSelection = element.getAttribute("data-answer");
        console.log(`User selection: ${userSelection}`);
    }
    
    // display message if correct or wrong, update score or timer
    if (userSelection === myQuestions[round].correctAnswer) {
        feedbackEl.textContent = "Correct!"

    } else {
        feedbackEl.textContent = "Sorry, incorrect answer."
        timeLeft = timeLeft - 10;
    }
    
    round++;

    // advance to next question if not at end of questions
    if (round < myQuestions.length) {
        renderQuestionCard();
    }
    
    return;
};

function displayHighScores(event) {
    
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

    return;
};

// Event Listeners

startButton.addEventListener("click", startTimer);

viewHighScoresEl.addEventListener("click", displayHighScores);

questionCardEl.addEventListener("click", checkAnswer);
