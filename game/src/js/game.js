/* eslint-disable no-undef */
function renderGameBlock(container) {
    const cardsBox = document.createElement('div');
    cardsBox.classList.add('cards-box');
    const level = window.application.level;
    let activeCards = [];
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

    function createDeck(cardPairs) {
        for (let i = 0; i < cardPairs; i++) {
            let rand = Math.floor(Math.random() * (36 - 0 + 1));
            let cardItem = cardsArr[0][rand];
            activeCards.push(cardItem);
        }
        const activeCardsDupe = Object.assign([], activeCards);
        const currentDeck = activeCards.concat(activeCardsDupe);
        currentDeck.sort(() => Math.random() - 0.5);
        window.application.deck = currentDeck;

        for (let i = 0; i < currentDeck.length; i++) {
            const card = document.createElement('img');
            url = currentDeck[i].src;
            card.setAttribute('src', `${url}`);
            rang = currentDeck[i].rang;
            card.setAttribute('value', `${rang}`);
            suit = currentDeck[i].suit;
            card.setAttribute('title', `${suit}`);
            card.classList.add('card-item');
            cardsBox.appendChild(card);
        }
        container.appendChild(cardsBox);
    }
}

window.application.blocks['gameBlock'] = renderGameBlock;

function renderTimerBlock(container) {
    const timerBox = document.createElement('div');
    timerBox.classList.add('timer-box');

    const timer = document.createElement('h1');
    timer.textContent = '00.00';
    timer.classList.add('timer');

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
    timerBox.appendChild(timer);

    container.appendChild(timerBox);
}

window.application.blocks['timerBlock'] = renderTimerBlock;

function renderGameScreen() {
    app.style = 'padding: 0';

    const button = document.createElement('button');
    button.textContent = 'Начать заново';
    button.classList.add('levels-btn');

    const upperGameBlock = document.createElement('div');
    upperGameBlock.classList.add('upper-game-block');

    window.application.renderBlock('timerBlock', upperGameBlock);
    upperGameBlock.appendChild(button);
    app.appendChild(upperGameBlock);
    window.application.renderBlock('gameBlock', app);

    const deckItems = document.querySelectorAll('.card-item');

    setTimeout(function () {
        for (let i = 0; i < deckItems.length; i++) {
            deckItems[i].src = 'src/img/рубашка.svg';
        }
    }, 5000);

    setTimeout(gamePlay, 5000);
}

window.application.screens['game'] = renderGameScreen;

let playedPairs = [];
let openCards = [];

function gamePlay() {
    const deck = document.querySelector('.cards-box');
    const deckHidden = window.application.deck;

    deck.addEventListener('click', (event) => {
        let targetCard = event.target;
        const rangActive = targetCard.getAttribute('value');
        const suitActive = targetCard.getAttribute('title');

        function gameAlert() {
            if (openCards.length + 1 === deckHidden.length) {
                console.log('победа');
                createPairs();
                setTimeout(function () {
                    alert('Вы победили!');
                }, 500);
            } else {
                console.log('следующий ход');
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
                console.log('lose');
                createPairs();
                setTimeout(function () {
                    alert('Вы проиграли!');
                }, 100);
            }
        }

        function createPairs() {
            for (let i = 0; i < deckHidden.length; i++) {
                if (
                    deckHidden[i].rang === rangActive &&
                    deckHidden[i].suit === suitActive
                ) {
                    targetCard.src = deckHidden[i].src;
                    playedPairs.push(deckHidden[i]);
                    openCards.push(deckHidden[i]);
                }
            }
            playedPairs.pop();
            openCards.pop();
        }
    });
}
