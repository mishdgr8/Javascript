const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "paris", correct: true },
      { text: "london", correct: false },
      { text: "rome", correct: false },
      { text: "madrid", correct: false },
    ],
  },
  {
    question: "What is the name of the largest ocean in the world?",
    answers: [
      { text: "Pacific Ocean", correct: false },
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: true },
      { text: "Arctic Ocean", correct: false },
    ],
  },
  {
    question: "Who is the current Prime Minister of Canada?",
    answers: [
      { text: "Joe Biden", correct: false },
      { text: "Richard Carmichael", correct: false },
      { text: "Stephen Colbert", correct: false },
      { text: "Andrew Johnson", correct: true },
    ],
  },
  {
    question: "What is the largest island in the world?",
    answers: [
      { text: "Greenland", correct: false },
      { text: "Madagascar", correct: false },
      { text: "Iceland", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    question: "What is the world's oldest city?",
    answers: [
      { text: "Baghdad", correct: false },
      { text: "Tokyo", correct: false },
      { text: "Mexico City", correct: false },
      { text: "Delhi", correct: true },
    ],
  },
  {
    question:
      "What is the name of the first American city to be named after a non-English word?",
    answers: [
      { text: "Washington D.C.", correct: false },
      { text: "New York City", correct: true },
      { text: "Los Angeles", correct: false },
      { text: "Chicago", correct: false },
    ],
  },
  {
    question:
      "What is the name of the first U.S. president to serve more than two terms?",
    answers: [
      { text: "George Washington", correct: false },
      { text: "Abraham Lincoln", correct: false },
      { text: "John Adams", correct: false },
      { text: "Thomas Jefferson", correct: true },
    ],
  },
  {
    question:
      "What is the name of the first European city to become a UNESCO World Heritage Site?",
    answers: [
      { text: "Paris", correct: false },
      { text: "Berlin", correct: true },
      { text: "London", correct: false },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "What is the name of the largest desert in the world?",
    answers: [
      { text: "Sahara", correct: false },
      { text: "Arabian Sea", correct: false },
      { text: "Great Barrier Reef", correct: false },
      { text: "Yarlunga Desert", correct: true },
    ],
  },
  {
    question:
      "What is the name of the first American city to be named after a river?",
    answers: [
      { text: "San Francisco", correct: false },
      { text: "New York City", correct: false },
      { text: "Seattle", correct: false },
      { text: "Los Angeles", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + " " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedButton = e.target;
  const correctAnswer = selectedButton.dataset.correct === "true";

  if (correctAnswer) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = "true";
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = "Your final score is: " + score;
  nextButton.innerHTML = "Restart";
  nextButton.style.display = "block";
  // nextButton.addEventListener("click", startQuiz);
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
