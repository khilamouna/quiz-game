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
  }

  function checkAnswer() {
    var question = questions[currentQuestion];
    var userAnswer = $(this).attr("data-index");
    if (userAnswer == question.correctAnswer) {
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

    // toggle color classes on selected answer button
    $(this).addClass(
      userAnswer == question.correctAnswer
        ? "correct-answer"
        : "incorrect-answer"
    );
    $(this).siblings().removeClass("correct-answer incorrect-answer");

    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      displayAnswer();
    }
  }

  displayQuestion();
  $("#choices").on("click", "button", checkAnswer);
});
