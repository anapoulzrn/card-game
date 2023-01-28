/* eslint-disable no-undef */
import { app } from './render';

console.log('game_end');
function renderWinBlock(container: HTMLElement) {
    const picBox = document.createElement('div');
    picBox.classList.add('pic-box');

    const winPic = document.createElement('img');
    winPic.setAttribute('src', 'assets/win.png');
    container.appendChild(winPic);
    winPic.classList.add('end-pic');

    const winText = document.createElement('h3');
    winText.classList.add('final-caption');
    winText.textContent = 'Вы выиграли!';

    picBox.appendChild(winPic);
    picBox.appendChild(winText);
    container.appendChild(picBox);
}

window.application.blocks['winBlock'] = renderWinBlock;

function renderLoseBlock(container: HTMLElement) {
    const picBox = document.createElement('div');
    picBox.classList.add('pic-box');

    const losePic = document.createElement('img');
    losePic.setAttribute('src', 'assets/lose.png');
    container.appendChild(losePic);
    losePic.classList.add('end-pic');

    const loseText = document.createElement('h3');
    loseText.classList.add('final-caption');
    loseText.textContent = 'Вы проиграли!';

    picBox.appendChild(losePic);
    picBox.appendChild(loseText);
    container.appendChild(picBox);
}

window.application.blocks['loseBlock'] = renderLoseBlock;

function renderSummaryBlock(container: HTMLElement) {
    const timerBox = document.createElement('div');
    timerBox.classList.add('timer-box-final');

    const timerText = document.createElement('h3');
    timerText.classList.add('final-text');
    timerText.textContent = 'Затраченное время:';
    container.appendChild(timerText);

    const timer = document.createElement('h1');
    timer.classList.add('timer-final');
    const timerValue = window.application.timerValue;
    timer.textContent = `${timerValue}`;
    container.appendChild(timer);

    const playAgainBtn = document.createElement('button');
    playAgainBtn.classList.add('final-btn');
    playAgainBtn.textContent = 'Играть снова';

    playAgainBtn.addEventListener('click', () => {
        window.application.renderScreen('levels');
    });

    timerBox.appendChild(timerText);
    timerBox.appendChild(timer);
    container.appendChild(timerBox);
    container.appendChild(playAgainBtn);
}

window.application.blocks['summaryBlock'] = renderSummaryBlock;

function renderGameEndScreen() {
    const content = document.createElement('div');
    content.classList.add('summary-box');

    const resultBox = document.createElement('div');
    resultBox.classList.add('result-box');

    const gameStatus = window.application.gameStatus;
    if (gameStatus === 'win') {
        window.application.renderBlock('winBlock', resultBox);
    } else {
        window.application.renderBlock('loseBlock', resultBox);
    }
    window.application.renderBlock('summaryBlock', resultBox);
    content.appendChild(resultBox);

    app!.appendChild(content);
}

window.application.screens['gameEnd'] = renderGameEndScreen;
