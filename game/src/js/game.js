function renderGameBlock(container) {
    const cardsBox = document.createElement('div');
    cardsBox.classList.add('cards-box');
    for (let i = 0; i < cardsArr.length; i++) {
        const card = document.createElement('img');
        const url = cardsArr[i].src;
        card.setAttribute('src', `${url}`);
        card.classList.add('card-item');
        cardsBox.appendChild(card);
    }
    container.appendChild(cardsBox)
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

}

window.application.screens['game'] = renderGameScreen;
