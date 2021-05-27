var timerEl = document.getElementById("time-countdown");
var timeLeftEl = document.getElementById("time-left");
var startButton = document.getElementById("start-button");
var questionCardEl = document.getElementById("question-card");
var viewHighScoresEl = document.getElementById("view-high-scores");
var highScoresList = document.getElementById("high-scores-list");
var highScoresEl = document.getElementById("high-scores-container");
var feedbackEl = document.getElementById("feedback");
var gameIntroEl = document.getElementById("game-intro");
var userScoreEl = document.getElementById("user-score");
var allDoneEl = document.getElementById("all-done");
var submitButton = document.getElementById("submit");

var questionEl = document.getElementById("question");
var answerA = document.getElementById("answerA");
var answerB = document.getElementById("answerB");
var answerC = document.getElementById("answerC");
var answerD = document.getElementById("answerD");

var timeLeft;
var round;
var userScore;
var isQuizOver;

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
    isQuizOver = false;
    round = 0;
    timeLeft = 60;

    startButton.disabled = true;
    submitButton.disabled = false;
    highScoresEl.setAttribute("style", "display: none");
    gameIntroEl.setAttribute("style", "display: none");
    questionCardEl.setAttribute("style", "display: block");
    allDoneEl.setAttribute("style", "display: none");
    feedbackEl.textContent = "";

    renderQuestionCard();

    var timeInterval = setInterval(function() {
        timeLeftEl.textContent = timeLeft;
        
        if (timeLeft > 0 && isQuizOver === false) {
            timeLeft--;
        } else if (isQuizOver) {
            clearInterval(timeInterval);
            quizOver();
        } else {
            clearInterval(timeInterval);
            quizOver()
        }
    }, 1000);

    return;
}

function renderQuestionCard() {
    
    questionEl.textContent = myQuestions[round].question;
    answerA.textContent = myQuestions[round].answers.a;
    answerB.textContent = myQuestions[round].answers.b;
    answerC.textContent = myQuestions[round].answers.c;
    answerD.textContent = myQuestions[round].answers.d;
    
    return;
}

function checkAnswer(event) {
    var element = event.target;
    
    // checks if user clicked a possible answer within question card, if so identify which one
    if(element.matches(".answer")) {
        var userSelection = element.getAttribute("data-answer");
    }
    
    // check if user selection was correct, display message & update timer accordingly
    if (userSelection === myQuestions[round].correctAnswer) {
        feedbackEl.textContent = "Your last response was correct!"
    } else {
        feedbackEl.textContent = "Sorry, your last response was incorrect."
        timeLeft = timeLeft - 10;
    }
    
    round++;

    // check if questions remaining, if so render question card, otherwise quiz over and get info for high score board
    if (round < myQuestions.length) {
        renderQuestionCard();
    } else {
        isQuizOver = true;
        quizOver();
    }
    
    return;
};

function saveUserResults (event) {
    event.preventDefault();
    
    var storedHighScores = JSON.parse(localStorage.getItem("highScores"))||[];
    var userInitials = document.querySelector("#userInitials").value.trim();
    var userResults = {
        initials: userInitials,
        score: userScore
    }

    storedHighScores.push(userResults)
    localStorage.setItem("highScores", JSON.stringify(storedHighScores));
    
    // Clears user initials text input field on page
    document.querySelector("#userInitials").value = "";

    submitButton.disabled = true;

    return;
};

function quizOver() {
     
    questionCardEl.setAttribute("style", "display: none");
    allDoneEl.setAttribute("style", "display: block");
    startButton.disabled = false;

    userScore = timeLeft;
    userScoreEl.textContent = userScore;   

    return;
};

function displayHighScores(event) {
    
    console.log(`Entered displayHighScores on a ${event.type}`);
    questionCardEl.setAttribute("style", "display: none");
    highScoresEl.setAttribute("style", "display: block");

    var storedHighScores = JSON.parse(localStorage.getItem("highScores"));

    // checks if localStorage has high scores, if so assigned to local variable
    if (storedHighScores !== null) {
        highScores = storedHighScores;
    }

    for (var i = 0; i < highScores.length; i++) {
        var name = highScores[i].name;
        var score = highScores[i].score;

        var li = document.createElement("li");
        li.textContent = `${name} - ${score}`;
        
        highScoresList.appendChild(li);
    }

    return;
};

// Event Listeners

startButton.addEventListener("click", startTimer);

viewHighScoresEl.addEventListener("click", displayHighScores);

questionCardEl.addEventListener("click", checkAnswer);

submitButton.addEventListener("click", saveUserResults);

