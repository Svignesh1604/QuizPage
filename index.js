const quizData = [
    {
        question: "What year was our company founded?",
        a: "2021",
        b: "2020",
        c: "2023",
        d: "2022",
        correct: "c"
    },
    {
        question: "Who is the CEO of our company?",
        a: "GR",
        b: "GP",
        c: "Ram",
        d: "Rahul",
        correct: "a"
    },
    {
        question: "What is the primary product of our company?",
        a: "Mobile App",
        b: "Web Platform",
        c: "AI Software",
        d: "E-commerce Website",
        correct: "b"
    },
    {
        question: "How many employees does our company have?",
        a: "Less than 10",
        b: "10-50",
        c: "50-100",
        d: "100+",
        correct: "b"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 90; // 1.5 minutes

const quizContainer = document.getElementById('quiz-container');
const submitBtn = document.getElementById('submit-btn');
const retryBtn = document.getElementById('retry-btn');
const result = document.getElementById('result');
const timerDisplay = document.getElementById('timer');
const quizSection = document.getElementById('quiz-section');
const rulesContainer = document.getElementById('rules-container');
const startBtn = document.getElementById('start-btn');

// Load the first question and render it
function loadQuiz() {
    const currentQuestion = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
        <div class="quiz-question">
            <h4>${currentQuestion.question}</h4>
        </div>
        <div class="quiz-options">
            <label><input type="radio" name="answer" value="a"> ${currentQuestion.a}</label><br>
            <label><input type="radio" name="answer" value="b"> ${currentQuestion.b}</label><br>
            <label><input type="radio" name="answer" value="c"> ${currentQuestion.c}</label><br>
            <label><input type="radio" name="answer" value="d"> ${currentQuestion.d}</label>
        </div>
    `;
    updateQuestionsLeft();
}

// Update the number of questions left
function updateQuestionsLeft() {
    const questionsLeftText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    document.querySelector('.quiz-header p').textContent = questionsLeftText;
}

// Get the selected answer from the user
function getSelectedAnswer() {
    const answers = document.querySelectorAll('input[name="answer"]');
    let selectedAnswer;
    answers.forEach(answer => {
        if (answer.checked) {
            selectedAnswer = answer.value;
        }
    });
    return selectedAnswer;
}

// Display the final result with score and improving remarks
function showResult() {
    clearInterval(timerInterval);
    quizSection.classList.add('d-none');
    submitBtn.classList.add('d-none');
    retryBtn.classList.remove('d-none');
    result.classList.remove('d-none');

    let remark = '';
    if (score === quizData.length) {
        remark = 'Excellent! You got everything right!';
    } else if (score > quizData.length / 2) {
        remark = 'Good job! Keep learning and improving!';
    } else {
        remark = 'Nice try! Review the material and try again for a better score.';
    }

    result.innerHTML = `
        <h4>Your final score: ${score} out of ${quizData.length}</h4>
        <p>${remark}</p>
    `;
}

// On submit button click, evaluate answer and move to the next question
submitBtn.addEventListener('click', () => {
    const selectedAnswer = getSelectedAnswer();
    if (selectedAnswer) {
        if (selectedAnswer === quizData[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuiz();
        } else {
            showResult(); // Show the final result when all questions are completed
        }
    } else {
        alert("Please select an answer!");
    }
});

// On retry button click, reset the quiz and start over
retryBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 90; // Reset the timer
    quizSection.classList.remove('d-none');
    submitBtn.classList.remove('d-none');
    retryBtn.classList.add('d-none');
    result.classList.add('d-none');
    loadQuiz();
    startTimer();
});

// On start button click, begin the quiz and hide the rules
startBtn.addEventListener('click', () => {
    rulesContainer.classList.add('d-none');
    quizSection.classList.remove('d-none');
    loadQuiz();
    startTimer();
});

// Timer function to count down from 2 minutes
function startTimer() {
    timerDisplay.textContent = `Time Left: 01:30`;
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `Time Left: ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            showResult();
        }
    }, 1000);
}
