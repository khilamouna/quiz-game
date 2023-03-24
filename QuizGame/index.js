var questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "Madrid", "Rome", "Berlin"],
    correctAnswer: 0,
  },
  {
    question: "What is the capital of Italy?",
    choices: ["Paris", "Madrid", "Rome", "Berlin"],
    correctAnswer: 2,
  },
  {
    question: "What is the capital of Spain?",
    choices: ["Paris", "Madrid", "Rome", "Berlin"],
    correctAnswer: 1,
  },
  {
    question: "What is the capital of Tunisia?",
    choices: ["Tunis", "Sousse", "Beja", "Sfax"],
    correctAnswer: 0,
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Mount Chaambi", "Mount Everest", "Mount Bouhedma"],
    correctAnswer: 1,
  },
];

var currentQuestion = 0;
var score = 0;

$(document).ready(function () {
  function displayQuestion() {
    var question = questions[currentQuestion];

    $("#theQuestion").text(question.question);
    $("#choices").empty();

    for (var i = 0; i < question.choices.length; i++) {
      var choice = question.choices[i];
      var button = $("<button>").text(choice);
      button.attr("data-index", i);
      $("#choices").append(button);
    }

    $("#choices button").removeClass("correct-answer incorrect-answer");
    $("#feedback").removeClass("correct incorrect").text("");
  }

  function displayAnswer() {
    var numCorrect = score;
    var numIncorrect = questions.length - numCorrect;
    var message = "The number of correct answers is " + numCorrect;
    if (numCorrect > numIncorrect) {
      message += " You have passed the quiz!";
    } else {
      message += " You didn't pass the quiz, try again later.";
    }

    $("#theQuestion").text(message);
    $("#choices").empty();
    $("#feedback").text("");
  }

  function checkAnswer() {
    var question = questions[currentQuestion];
    var userAnswer = $(this).attr("data-index");
    var isCorrect = userAnswer == question.correctAnswer;
    $(this).toggleClass("correct-answer", isCorrect);
    $(this).toggleClass("incorrect-answer", !isCorrect);

    if (isCorrect) {
      score++;
      $("#score").text("Score: " + score);
      $("#feedback")
        .text("Correct!")
        .removeClass("incorrect")
        .addClass("correct");
    } else {
      $("#feedback")
        .text("Incorrect!")
        .removeClass("correct")
        .addClass("incorrect");
    }

    $("#choices button").attr("disabled", true);

    currentQuestion++;
    if (currentQuestion < questions.length) {
      setTimeout(function () {
        displayQuestion();
      }, 2000);
    } else {
      setTimeout(function () {
        displayAnswer();
      }, 2000);
    }
  }

  displayQuestion();
  $("#choices").on("click", "button", checkAnswer);
});
