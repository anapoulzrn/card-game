/* eslint-disable no-undef */
import { app } from './render';
import { cardsArr } from './cards';
console.log('game');
let interval: string | number | NodeJS.Timeout | undefined;
window.application.interval = interval;

function renderGameBlock(container: HTMLElement) {
    const cardsBox = document.createElement('div');
    cardsBox.classList.add('cards-box');
    const level = window.application.level;
    let activeCards: any[] = [];
    if (level === '1') {
        const cardPairs = '3';
        createDeck(cardPairs);
    } else if (level === '2') {
        const cardPairs = '6';
        createDeck(cardPairs);
    } else {
        const cardPairs = '9';
        createDeck(cardPairs);
    }

    function createDeck(cardPairs: string | number) {
        for (let i = 0; i < cardPairs; i++) {
            let rand = Math.floor(Math.random() * (36 - 0 + 1));
            // eslint-disable-next-line no-undef
            let cardItem = cardsArr[0][rand];
            activeCards.push(cardItem);
        }
        const activeCardsDupe = Object.assign([], activeCards);
        const currentDeck = activeCards.concat(activeCardsDupe);
        currentDeck.sort(() => Math.random() - 0.5);
        window.application.deck = currentDeck;

        for (let i = 0; i < currentDeck.length; i++) {
            const card = document.createElement('img');
            let url = currentDeck[i].src;
            card.setAttribute('src', `${url}`);
            let rang = currentDeck[i].rang;
            card.setAttribute('value', `${rang}`);
            let suit = currentDeck[i].suit;
            card.setAttribute('title', `${suit}`);
            card.classList.add('card-item');
            cardsBox.appendChild(card);
        }
        container.appendChild(cardsBox);
    }
}

window.application.blocks['gameBlock'] = renderGameBlock;

function renderTimerBlock(container: HTMLElement) {
    const timerBox = document.createElement('div');
    timerBox.classList.add('timer-box');

    const timerNumbers = document.createElement('div');
    timerNumbers.classList.add('timer__numbers');

    const timerMinutes = document.createElement('h1');
    timerMinutes.textContent = '00';
    timerMinutes.classList.add('timer-minutes');

    const timerSeconds = document.createElement('h1');
    timerSeconds.textContent = '00';
    timerSeconds.classList.add('timer-seconds');

    timerNumbers.appendChild(timerMinutes);
    timerNumbers.appendChild(timerSeconds);

    const timeItems = document.createElement('div');
    timeItems.classList.add('time-items');

    const min = document.createElement('h3');
    min.textContent = 'min';
    min.classList.add('timer-item');

    const sec = document.createElement('h3');
    sec.textContent = 'sec';
    sec.classList.add('timer-item');

    timeItems.appendChild(min);
    timeItems.appendChild(sec);

    timerBox.appendChild(timeItems);
    timerBox.appendChild(timerNumbers);

    container.appendChild(timerBox);
}

window.application.blocks['timerBlock'] = renderTimerBlock;

function renderGameScreen() {
    app!.setAttribute('style', 'padding: 0');

    const button = document.createElement('button');
    button.textContent = 'Начать заново';
    button.classList.add('start-again-btn');

    const upperGameBlock = document.createElement('div');
    upperGameBlock.classList.add('upper-game-block');

    window.application.renderBlock('timerBlock', upperGameBlock);
    upperGameBlock.appendChild(button);
    app!.appendChild(upperGameBlock);

    button.addEventListener('click', () => {
        clearInterval(interval);
        window.application.renderScreen('levels');
        app!.setAttribute('style', 'padding: 145px');

    });

    window.application.renderBlock('gameBlock', app);

    const deckItems = document.querySelectorAll('.card-item');

    function timer() {
        let minutes = 0;
        let seconds = 0;

        for (let i = 0; i < deckItems.length; i++) {
            let itemSrc = deckItems[i].getAttribute('src');
            if (itemSrc === 'assets/рубашка.svg') {
                clearInterval(interval);
                interval = setInterval(timerStart, 1000);
            }
        }

        function timerStart() {
            const timerSeconds = document.querySelector('.timer-seconds');
            const timerMinutes = document.querySelector('.timer-minutes');
            seconds++;
            if (seconds <= 9) {
                timerSeconds!.textContent = '0' + seconds;
            } else if (seconds > 9) {
                let sec = String(seconds);
                timerSeconds!.textContent = sec;
            }
            if (seconds > 60) {
                minutes++;
                timerMinutes!.textContent = '0' + minutes;
                seconds = 0;
                timerSeconds!.textContent = '0' + seconds;
            }
        }
    }

    setTimeout(function () {
        for (let i = 0; i < deckItems.length; i++) {
            deckItems[i].setAttribute('src', 'assets/рубашка.svg');
        }
        timer();
    }, 5000);

    setTimeout(gamePlay, 5000);

    let playedPairs: any[] = [];
    let openCards: any[] = [];

    function gamePlay() {
        const deck = document.querySelector('.cards-box');
        const deckHidden = window.application.deck;

        deck!.addEventListener('click', (event) => {
            let targetCard = event.target as HTMLElement;
            const rangActive = targetCard!.getAttribute('value');
            const suitActive = targetCard!.getAttribute('title');
            const timerSeconds = document.querySelector('.timer-seconds');
            const timerMinutes = document.querySelector('.timer-minutes');

            function gameAlert() {
                if (openCards.length + 1 === deckHidden.length) {
                    createPairs();
                    clearInterval(interval);
                    window.application.timerValue =
                        `${timerMinutes!.textContent}` +
                        ':' +
                        `${timerSeconds!.textContent}`;
                    setTimeout(function () {
                        window.application.gameStatus = 'win';
                        window.application.renderScreen('gameEnd');
                    }, 500);
                } else {
                    createPairs();
                }
            }

            if (playedPairs.length < 2) {
                gameAlert();
            } else if (playedPairs.length === 2) {
                if (playedPairs[0] === playedPairs[1]) {
                    playedPairs.length = 0;
                    gameAlert();
                } else {
                    createPairs();
                    clearInterval(interval);
                    window.application.timerValue =
                        `${timerMinutes!.textContent}` +
                        ':' +
                        `${timerSeconds!.textContent}`;

                    setTimeout(function () {
                        window.application.gameStatus = 'lose';
                        window.application.renderScreen('gameEnd');
                    }, 10);
                }
            }

            function createPairs() {
                for (let i = 0; i < deckHidden.length; i++) {
                    if (
                        deckHidden[i].rang === rangActive &&
                        deckHidden[i].suit === suitActive
                    ) {
                        targetCard!.setAttribute('src', deckHidden[i].src);
                        playedPairs.push(deckHidden[i]);
                        openCards.push(deckHidden[i]);
                    }
                }
                playedPairs.pop();
                openCards.pop();
            }
        });
    }
}

window.application.screens['game'] = renderGameScreen;
