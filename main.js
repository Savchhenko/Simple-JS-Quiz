/* All answer options */
const option1 = document.querySelector('.option1'),
        option2 = document.querySelector('.option2'),
        option3 = document.querySelector('.option3'),
        option4 = document.querySelector('.option4');
/* All our options */
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'),
        numberOfQuestion = document.getElementById('number-of-question'),
        numberOfAllQuestion = document.getElementById('number-of-all-questions'),
        answersTracker = document.getElementById('answers-tracker'),
        btnNext = document.getElementById('btn-next'),
        correctAnswer = document.getElementById('correct-answer'),
        numberOfAllQuestion2 = document.getElementById('number-pf-all-questions-2'),
        btnTryAgain = document.getElementById('btn-try-again');

let indexOfQuestion,  // index of current question
    indexOfPage = 0,  // index of the page
    score = 0;        // final result of quiz

const questions = [
    {
        question: 'Как в JavaScript вычислить процент от числа ?',
        options: [
            'Так в JavaScript нельзя делать',
            'Оператор: % ',
            'Умножить на кол-во процентов и разделить на 100',
            'Вызвать метод findPrecent()',
        ],
        rightAnswer: 2
    },
    {
        question: 'Результат выражения: "13" + 7',
        options: [
            '20',
            '137',
            'undefined',
            'error',
        ],
        rightAnswer: 1
    },
    {
        question: 'На JavaScript нельзя писать: ',
        options: [
            'Игры',
            'Скрипты для сайтов',
            'Десктопные приложения',
            'Плохо',
        ],
        rightAnswer: 3
    } 
];

numberOfAllQuestion.innerHTML = questions.length; // выводим кол-во всех вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // current question

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // it is number of current page
    indexOfPage++; 
};

let completedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        };
        if(completedAnswers == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    };
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    });
};

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'wrong', 'correct');
    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = status => {
    console.log(answersTracker.children);
    console.log(status);
    console.log(indexOfPage);
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

for(option of optionElements) {
    option.addEventListener('click', event => checkAnswer(event));
}

const quizOver = () => {
    console.log('Game over.');
};

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});

