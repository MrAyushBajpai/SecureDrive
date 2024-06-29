let currentQuestion = 1;

function nextQuestion() {
    currentQuestion++;
    loadQuestion(currentQuestion);
}

function submitAnswer(answer) {
    console.log(`Answer for Question ${currentQuestion}: ${answer}`);
    // You can send the answer to the server here if needed
}

function loadQuestion(questionNumber) {
    // Load question data and update the DOM accordingly
    document.getElementById('question-title').textContent = `Question ${questionNumber}`;
    document.getElementById('question-image').src = `question${questionNumber}.jpg`;
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion(currentQuestion);
});
