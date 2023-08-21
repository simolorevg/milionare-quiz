const { createApp } = Vue;
createApp({
    data() {
        return {
            questionIndex: 0,
            points: 0,
            errors: 0,
            loseGame: false,
            currentQuestion: {},
            questions: [
                {
                    question: 'In quale anno è stato creato il World Wide Web?',
                    answers: [
                        {
                            sentence: '1996',
                            value: false
                        },
                        {
                            sentence: '1945',
                            value: false
                        },
                        {
                            sentence: '1991',
                            value: true
                        },
                        {
                            sentence: '1891',
                            value: false
                        }
                    ],
                    questionMoney: 500
                },
                {
                    question: 'Quale band cantò Let It Be?',
                    answers: [
                        {
                            sentence: 'Beatles',
                            value: true
                        },
                        {
                            sentence: 'Rolling Stones',
                            value: false
                        },
                        {
                            sentence: 'Maneskin',
                            value: false
                        },
                        {
                            sentence: 'Pooh',
                            value: false
                        }
                    ],
                    questionMoney: 1000
                },
                {
                    question: 'Qual è lo stato più piccolo del mondo?',
                    answers: [
                        {
                            sentence: 'Andorra',
                            value: false
                        },
                        {
                            sentence: 'Città del Vaticano',
                            value: true
                        },
                        {
                            sentence: 'San Marino',
                            value: false
                        },
                        {
                            sentence: 'Liechtenstein',
                            value: false
                        }
                    ],
                    questionMoney: 2000
                },
                {
                    question: 'Qual è il fiume più lungo del mondo?',
                    answers: [
                        {
                            sentence: 'Il Po',
                            value: false
                        },
                        {
                            sentence: 'Il Danubio',
                            value: false
                        },
                        {
                            sentence: 'Il Nilo',
                            value: true
                        },
                        {
                            sentence: 'Il Mekong',
                            value: false
                        }
                    ]
                },
                {
                    question: 'Dove è nato Cristoforo Colombo?',
                    answers: [
                        {
                            sentence: 'Carrara',
                            value: false
                        },
                        {
                            sentence: 'Pontremoli',
                            value: false
                        },
                        {
                            sentence: 'Genova',
                            value: true
                        },
                        {
                            sentence: 'La Spezia',
                            value: false
                        }
                    ],
                    questionMoney: 3000
                },
                {
                    question: 'Quante sono le isole Eolie?',
                    answers: [
                        {
                            sentence: '8',
                            value: false
                        },
                        {
                            sentence: '6',
                            value: false
                        },
                        {
                            sentence: '9',
                            value: false
                        },
                        {
                            sentence: '7',
                            value: true
                        }
                    ],
                    questionMoney: 4000
                },
                {
                    question: 'Quanti canti ci sono nella Divina Commedia?',
                    answers: [
                        {
                            sentence: '150',
                            value: false
                        },
                        {
                            sentence: '99',
                            value: false
                        },
                        {
                            sentence: '100',
                            value: true
                        },
                        {
                            sentence: '120',
                            value: false
                        }
                    ],
                    questionMoney: 5000
                }
            ],
            endGame: false
        }
    },
    mounted() {
        this.currentQuestion = this.questions[this.questionIndex];
    },
    methods: {
        checkAnswers(value, index) {
            let box = document.getElementById(index);
            box.classList.add('choice');
            this.playSound('sounds/selezionerisposta.mp3');
            setTimeout(() => this.monitorAnswer(value, index), 1000);
        },
        monitorAnswer(answer, index) {
            let box = document.getElementById(index);
            box.classList.remove('choice');
            if (answer) {
                this.playSound('sounds/rispostacorretta.mp3');
                box.classList.add('correct');
                this.points = this.currentQuestion.questionMoney;
                setTimeout(() => this.nextQuestion(index), 1500);
            } else {
                this.playSound('sounds/rispostasbagliata.mp3');
                box.classList.add('wrong');
                setTimeout(() => this.stopTheGame(), 500);
            };

        },
        stopTheGame() {
            this.endGame = true;
            this.loseGame = true;
        },
        nextQuestion(item) {
            let box = document.getElementById(item);
            box.classList.remove('choice', 'correct', 'wrong');
            this.questionIndex++;
            if (this.questionIndex === this.questions.length) {
                this.endGame = true;
                this.playSound('sounds/tada.wav');
            } else {
                this.currentQuestion = this.questions[this.questionIndex];
            }
        },
        playSound(url) {
            const audio = new Audio(url);
            audio.play();
        },
        refreshPage() {
            window.location.reload();
        }
    }
}).mount('#app');