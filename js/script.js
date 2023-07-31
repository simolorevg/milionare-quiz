const { createApp } = Vue;
createApp({
    data() {
        return {
            questionIndex: 0,
            points: 0,
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
                    ]
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
                    ]
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
                    ]
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
                this.points = this.points + 1;
                this.playSound('sounds/rispostacorretta.mp3');
                box.classList.add('correct');
            } else {
                if (this.points > 0) {
                    this.points = this.points - 1;
                }
                this.playSound('sounds/rispostasbagliata.mp3');
                box.classList.add('wrong');
            };
            setTimeout(() => this.nextQuestion(index), 1000);
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