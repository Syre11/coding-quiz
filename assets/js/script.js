var containerEl = document.querySelector(".container")
var viewHighscoresEL = document.querySelector("#viewHighscores")
var timerEl = document.querySelector("#timer")
var currentTimeEl = document.querySelector("#currentTime")
var quizTitleEl = document.querySelector("#quizTitle")
var quizInstrEl = document.querySelector("#quizInstr")
var questionEl = document.querySelector("#question")
var answersEl = document.querySelector("#answers")
var responseEl = document.querySelector("#cpuResponse")
var startButton = document.querySelector("#startBtn")
var a1El = document.querySelector("#answer1")
var a2El = document.querySelector("#answer2")
var a3El = document.querySelector("#answer3")
var a4El = document.querySelector("#answer4")
var userAnswerEl = document.querySelector(".userAnswer")
var scoreInputsEl = document.querySelector("#scoreInput")
var highscoresEl = document.querySelector("#highscores")
var scoresEl = document.querySelector("#scores")
var returnToQuizBtn = document.querySelector("#returnToQuiz")
var submitScoreBtn = document.querySelector("#submitScore")
var yourScoreEl = document.querySelector("#yourScore")
var initialsEl = document.querySelector("#initials")


//hides questions list on page load



var currentQuestion = 0;
var highScores = [];
var timeLeft = 30;
var score;
var timeInterval;
var questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hecka Tan Muscular Lady", "Have Too Much Lettuce", "Healthy Tall Male Leader", "Hypertext Markup Language"],
    correct: document.querySelector("#answer4")
  },
  {
    question: "What is the symbol to call an id in CSS?",
    options: ["*", "#", ".", "♫"],
    correct: document.querySelector("#answer2")
  },
  {
    question: "How do you create a function in JavaScript?",
    options: ["function:myFunction()", "Create; myFunction()", "function myFunction()", "function myFunction {}"],
    correct: document.querySelector("#answer3")
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["words-size", "text-size", "font-style", "font-size"],
    correct: document.querySelector("#answer4")
  },
  {
    question: "How can you add a comment in a JavaScript?",
    options: ["//comment", "!--comment", "***comment", ">?<comment"],
    correct: document.querySelector("#answer1")
  }
];

  //sets the given element to no longer be hidden
function show(element) {
  element.setAttribute("style", "display: block")
}

  //hides given element
function hide(element) {
  element.setAttribute("style", "display: none")
}

function startTimer() {
  timeInterval = setInterval(function () {
    if (timeLeft > -1) {
      currentTimeEl.textContent = timeLeft;
      timeLeft--;

    } else {
      timerEl.textContent =  'Times Up!';
      timeLeft = 0;
      score = 0;
      endQuiz();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timeInterval);
  score = timeLeft;
}

function nextQuestion() {
  show(answersEl);
  hide(startButton);
  //ties each answer to its respective li
  if (currentQuestion < questions.length) {
    questionEl.textContent = questions[currentQuestion].question;
    a1El.textContent = questions[currentQuestion].options[0];
    a2El.textContent = questions[currentQuestion].options[1];
    a3El.textContent = questions[currentQuestion].options[2];
    a4El.textContent = questions[currentQuestion].options[3];
  } else {
    stopTimer();
    endQuiz();
  }
}

//I really want to make this response timed, but I'm running out of time
function checkAnswer(event) {
  if (event.target == questions[currentQuestion].correct) {
    responseEl.textContent = "Correct!";
  } else {
    timeLeft = timeLeft - 5;
    responseEl.textContent = "Incorrect!";
  }
}

function endQuiz() {
  hide(containerEl);
  hide(timerEl);
  show(scoreInputsEl);
  yourScoreEl.textContent = score;
}

function quizReset () {
  currentQuestion = 0;
  timeLeft = 30;
  startButton.setAttribute("style", "display: inline");
  show(quizInstrEl);
  show(quizTitleEl);
  hide(questionEl);
  hide(answersEl);
  hide(responseEl);
}

function storeHighscores () {
  show(highscoresEl);
  highScores = JSON.parse(localStorage.getItem("scores"));
  var newScoreArray = document.createElement("li");
  newScoreArray.textContent = "User: " + localStorage.getItem('username') + "     Score: " + localStorage.getItem('userscore');
  document.querySelector("#scores").appendChild(newScoreArray);
}

hide(answersEl);
hide(scoreInputsEl);
hide(highscoresEl);
hide(timerEl);

startButton.addEventListener("click", function() {
  hide(quizTitleEl);
  hide(quizInstrEl);
  hide(scoreInputsEl);
  hide(viewHighscoresEL);
  show(questionEl);
  show(timerEl);
  show(responseEl);
  nextQuestion();
  startTimer();
});

answersEl.addEventListener("click", function(event) {
  checkAnswer(event);
  currentQuestion++;
  nextQuestion();
})

viewHighscoresEL.addEventListener("click", function () {
  hide(timerEl);
  hide(containerEl);
  show(highscoresEl);
})

returnToQuizBtn.addEventListener("click", function() {
  show(containerEl);
  hide(highscoresEl);
  show(viewHighscoresEL);
  quizReset();
})

submitScoreBtn.addEventListener("click", function() {
  var userInitials = initialsEl.value.trim();
  if (userInitials) {
    localStorage.setItem('username', userInitials);
    localStorage.setItem('userscore', score);
    hide(scoreInputsEl);
    show(viewHighscoresEL);
    storeHighscores();
  }
})