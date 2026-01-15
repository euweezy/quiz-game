// Screens
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

// Buttons
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

// Quiz text & info
const questionText = document.getElementById("question-text");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreDisplay = document.getElementById("score"); 

// Answers & progress
const answersContainer = document.getElementById("answers-container");
const progressBar = document.getElementById("progress");

// Results
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max");
const scoreSpan = document.getElementById("Score");
const resultMessage = document.getElementById("result-message");

// Quiz Data
const quizQuestions = [
    {
        "question": "What is the capital of the Philippines?",
        "answers": [
            { text: "Davao", correct: false },
            { text: "Cebu", correct: false },
            { text: "Manila", correct: true },
            { text: "Maguindanao", correct: false },
        ]
    },
    {
        "question": "Who is our national hero?",
        "answers": [
            { text: "Apolinario Mabini", correct: false },
            { text: "Jose Rizal", correct: true },
            { text: "Andres Bonifacio", correct: false },
            { text: "J. Rizz", correct: false },
        ]
    },
    {
        "question": "What is the national language of the Philippines?",
        "answers": [
            { text: "Cebuano", correct: false },
            { text: "English", correct: false },
            { text: "Filipino", correct: true },
            { text: "Spanish", correct: false },
        ]
    },
    {
        "question": "Which Philippine island group is the largest?",
        "answers": [
            { text: "Visayas", correct: false },
            { text: "Mindanao", correct: false },
            { text: "Luzon", correct: true },
            { text: "Palawan", correct: false },
        ]
    },
    {
        "question": "What is the national bird of the Philippines?",
        "answers": [
            { text: "Maya", correct: false },
            { text: "Philippine Eagle", correct: true },
            { text: "Crow", correct: false },
            { text: "Parrot", correct: false },
        ]
    },
    {
        "question": "What is the national flower of the Philippines?",
        "answers": [
            { text: "Rose", correct: false },
            { text: "Sampaguita", correct: true },
            { text: "Sunflower", correct: false },
            { text: "Gumamela", correct: false },
        ]
    },
    {
        "question": "How many regions are there in the Philippines?",
        "answers": [
            { text: "15", correct: false },
            { text: "16", correct: false },
            { text: "17", correct: true },
            { text: "18", correct: false },
        ]
    },
    {
        "question": "What is the currency of the Philippines?",
        "answers": [
            { text: "Dollar", correct: false },
            { text: "Yen", correct: false },
            { text: "Peso", correct: true },
            { text: "Euro", correct: false },
        ]
    },
    {
        "question": "What is the oldest city in the Philippines?",
        "answers": [
            { text: "Manila", correct: false },
            { text: "Cebu", correct: true },
            { text: "Davao", correct: false },
            { text: "Iloilo", correct: false },
        ]
    },
    {
        "question": "Who was the first President of the Philippines?",
        "answers": [
            { text: "Manuel L. Quezon", correct: false },
            { text: "Emilio Aguinaldo", correct: true },
            { text: "Jose P. Laurel", correct: false },
            { text: "Sergio Osmeña", correct: false },
        ]
    },
]

// Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;
let doneQuestions = [];
let quizLength = 5;
let questionNumber;

totalQuestionsSpan.textContent = quizLength;
maxScoreSpan.textContent = quizLength;


// Event Listener
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

// Functions
function startQuiz() {
    console.log("Quiz Started");

    questionNumber = 0;
    doneQuestions = [];
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove("active");
    startScreen.classList.add("screen");
    quizScreen.classList.remove("screen");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {
    answersDisabled = false;

    currentQuestionIndex = chooseQuestion();
    const currentQuestion = quizQuestions[currentQuestionIndex];

    const progressPercent = ((questionNumber) / (quizLength)) * 100;
    progressBar.style.width = progressPercent + "%";

    questionNumber++;
    currentQuestionSpan.textContent = questionNumber;

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answers-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
}

function chooseQuestion() {
    let nextQuestionIndex;
    do {
        nextQuestionIndex = (Math.random() * quizQuestions.length) | 0;
    } while (doneQuestions.includes(nextQuestionIndex) && doneQuestions.length < quizLength);

    doneQuestions.push(nextQuestionIndex);
    return nextQuestionIndex;
}

function selectAnswer(event) {
    console.log("Answer Selected");

    if(answersDisabled) return;
    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        if(questionNumber < quizLength) {
            showQuestion();
        } else {
            progressBar.style.width = "100%";
            setTimeout(() => {
                showResults();
            }, 1000);
        }
    }, 1000);   
}

function showResults() {
    quizScreen.classList.remove("active");
    quizScreen.classList.add("screen");
    resultScreen.classList.remove("screen");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizLength) * 100;
    
    if (percentage === 100) {
        resultMessage.textContent = "Perpekto! \"Ang kabataan ang pag-asa ng bayan.\" - Jose Rizal 🎉";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Napakagaling! \"Ang hindi marunong lumingon sa pinanggalingan ay hindi makararating sa paroroonan.\" - Jose Rizal 👏";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Mahusay! \"Mabuti pang mamatay para sa kalayaan kaysa mabuhay na alipin.\" - Emilio Jacinto 👍";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Subukan muli! \"Huwag kang mangamba, kasama mo ako.\" - Andres Bonifacio 💪";
    } else {
        resultMessage.textContent = "\"Ang taong walang kabo sa sariling wika, daig pa ang hayop at malansang isda.\" - Jose Rizal 🐟";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    resultScreen.classList.add("screen");
    
    startQuiz();
}       