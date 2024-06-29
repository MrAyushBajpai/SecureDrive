// Sample data for questions
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "London", "Madrid"],
        icon: "icons/france.png"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
        icon: "icons/book.png"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        icon: "icons/mars.png"
    }
    // Add more questions as needed
];

let currentQuestionIndex = 0; // Initialize the current question index

// Function to load current question
function loadQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = ''; // Clear previous content

    const quizItem = quizData[currentQuestionIndex];

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    // Add question icon
    const iconImg = document.createElement('img');
    iconImg.src = quizItem.icon;
    iconImg.alt = `Icon for Question ${currentQuestionIndex + 1}`;
    questionDiv.appendChild(iconImg);

    // Add question text
    const questionText = document.createElement('p');
    questionText.textContent = quizItem.question;
    questionDiv.appendChild(questionText);

    // Add options
    const optionsList = document.createElement('ul');
    quizItem.options.forEach((option, index) => {
        const optionItem = document.createElement('li');
        optionItem.textContent = option;
        optionItem.dataset.index = index; // Store option index for checking answers
        optionItem.addEventListener('click', selectOption);
        optionsList.appendChild(optionItem);
    });
    questionDiv.appendChild(optionsList);

    // Append the question div to the quiz container
    quizContainer.appendChild(questionDiv);
}

// Function to handle option selection
function selectOption(event) {
    const selectedOptionIndex = event.target.dataset.index;
    const correctAnswerIndex = quizData[currentQuestionIndex].options.indexOf('Paris'); // Change this to actual correct answer index dynamically

    if (selectedOptionIndex == correctAnswerIndex) {
        alert('Correct!');
    } else {
        alert('Incorrect!');
    }

    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        alert('Quiz finished!');
    }
}

// Call loadQuestion to start the quiz
loadQuestion();
