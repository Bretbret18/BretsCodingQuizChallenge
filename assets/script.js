var startButton = document.getElementById("start_btn");

var quizBoxOne = document.getElementById("quiz_box1");
var quizBoxTwo = document.getElementById("quiz_box2")
var quizBoxThree = document.getElementById("quiz_box3")
var quizBoxFour = document.getElementById("quiz_box4")
var quizBoxFive = document.getElementById("quiz_box5")

var rightOrWrong = document.getElementById("rightOrWrong");

var infoBoxId = document.getElementById("info_box");
var resultBox = document.getElementById("result_box");

var lastQuizBox = document.getElementById("quiz_box5");

var highScores = document.getElementById("high_scores")
var highScoresTable = document.getElementById('highScoresTable')

var viewHighScoresBtn = document.getElementById('viewHighScoresBtn');

var restartBtn = document.getElementById("restart");

let highScoresAdded = false;


let initialsForm;
var initials;
const index = 'initialsCollection';

function renderInitialsTable() {

  let existingInitials = localStorage.getObj(index)
  //sort before rendering
  existingInitials.sort(compare)

  if (existingInitials != null && highScoresAdded == false) {
    for (var i = 0; i < existingInitials.length; i++) {
      var row = highScoresTable.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);


      cell2.innerHTML = existingInitials[i].initials
      cell3.innerHTML = existingInitials[i].score
    }
    highScores.setAttribute("class", "show")
  }
  highScoresAdded = true;

};

function compare(a, b) {
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
    return 1;
  }
  return 0;
};



window.onload = function () {
  initials = document.getElementById('initials')
  initialsForm = document.getElementById("initialsForm");

  viewHighScoresBtn.onclick = function () {
    rightOrWrong.setAttribute("class", "hidden");
    lastQuizBox.setAttribute("class", "hidden");
    quizBoxOne.setAttribute("class", "hidden")
    quizBoxTwo.setAttribute("class", "hidden");
    quizBoxThree.setAttribute("class", "hidden");
    quizBoxFour.setAttribute("class", "hidden");
    quizBoxFive.setAttribute("class", "hidden");
    resultBox.setAttribute("class", "hidden");
    infoBoxId.setAttribute("class", "hidden")
    renderInitialsTable()
  }


  initialsForm.onsubmit = function (e) {
    e.preventDefault()

    // save the initials
    let existingInitials = localStorage.getObj(index)

    if (existingInitials == null) {
      existingInitials = []
    }
    existingInitials.push({ 'initials': initials.value, 'score': score })
    localStorage.setObj(index, existingInitials);

    console.log('initials collection', localStorage.getObj(index))

    // load the high scores
    resultBox.setAttribute("class", "hidden")
    renderInitialsTable()
    score = 0
  }
 
};

 




Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj))
};


Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key))
};


let timeLeft = 75;
let interval;
let score = 0;


// Start Button, Phase 1 //
var startButtonPush = function () {
  console.log("startButtonPush");
  infoBoxId.setAttribute("class", "hidden");
  quizBoxOne.setAttribute("class", "hidden");
  resultBox.setAttribute("class", "hidden");
  highScores.setAttribute("class", "hidden");
  viewHighScoresBtn.setAttribute("class", "show");

  interval = setInterval(function () {

    timeLeft = timeLeft - 1
    document.getElementById('time').textContent = timeLeft

    if (timeLeft == 0) {
      clearInterval(interval)
      rightOrWrong.setAttribute("class", "hidden");
      lastQuizBox.setAttribute("class", "hidden");
      quizBoxOne.setAttribute("class", "hidden")
      quizBoxTwo.setAttribute("class", "hidden");
      quizBoxThree.setAttribute("class", "hidden");
      quizBoxFour.setAttribute("class", "hidden");
      quizBoxFive.setAttribute("class", "hidden");
      resultBox.setAttribute("class", "show");
      document.querySelector('#finalScore').innerHTML = score
    }
  }, 1000);

  quizPage();
};


function quizPage() {
  console.log('question number ', currentQuestion)
  var optionsForCurrentQuestion = document.querySelectorAll(".option.quiz_box" + currentQuestion);
  var currentBox = document.getElementById('quiz_box' + currentQuestion)
  currentBox.setAttribute('class', 'show')

  for (var option of optionsForCurrentQuestion) {
    option.addEventListener("click", (e) => {
      var className = e.target.className
      var result = checkAnswer(className)
      if (result == false && timeLeft >= 5) {
        timeLeft -= 5;
      }
      else {
        score = timeLeft;
      }

      displayRightOrWrong(result)
      if (result == true) {
        currentBox.setAttribute("class", "hidden");
        currentQuestion++;
        if (currentQuestion < 6) {
          quizPage()
        }
        else {
          endQuiz();
        }
      }
    })
  }
};


function endQuiz() {
  clearInterval(interval)
  rightOrWrong.setAttribute("class", "hidden");
  lastQuizBox.setAttribute("class", "hidden");
  quizBoxOne.setAttribute("class", "hidden")
  quizBoxTwo.setAttribute("class", "hidden");
  quizBoxThree.setAttribute("class", "hidden");
  quizBoxFour.setAttribute("class", "hidden");
  quizBoxFive.setAttribute("class", "hidden");
  
  resultBox.setAttribute("class", "show");
  document.querySelector('#finalScore').innerHTML = score
};



function displayRightOrWrong(result) {
  if (result == true) {
    rightOrWrong.textContent = "Correct!"
  }
  else {
    rightOrWrong.textContent = "Wrong!"
  }
};


function checkAnswer(className) {
  if (className === 'wrong') {
    return false;
  }
  else if ('correct') {
    return true;
  }
};


var startingSeconds = 75;
var time = startingSeconds
var countdownEl = document.getElementById("timer_loc");
var que_count = 0;


// getting questions and options from array//
function showQuestions() {
  var quiz_box = document.getElementById("quiz_box");
  var que_tag = "<span>" + questions[0].question + "</span>";
  quiz_box.innerHTML = que_tag;
};



var currentQuestion = 1;


startButton.onclick = startButtonPush

restartBtn.onclick = function(e) {
 location.reload();
};
