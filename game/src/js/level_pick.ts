import { app } from './render';
console.log('level pick');

function renderLevelsBlock(container: HTMLElement) {
    const levelsBox = document.createElement('div');
    levelsBox.classList.add('levels-box');

    const level_1 = document.createElement('div');
    level_1.classList.add('level');
    level_1.textContent = '1';
    levelsBox.appendChild(level_1);

    const level_2 = document.createElement('div');
    level_2.classList.add('level');
    level_2.textContent = '2';
    levelsBox.appendChild(level_2);

    const level_3 = document.createElement('div');
    level_3.classList.add('level');
    level_3.textContent = '3';
    levelsBox.appendChild(level_3);
    const button = document.createElement('button');
    button.classList.add('levels-btn');
    button.textContent = 'Старт';

    button.addEventListener('click', () => {
        if (!window.application.level) {
            console.warn('Выберите уровень');
        } else {
            window.application.renderScreen('game');
        }
    });

    container.appendChild(levelsBox);
    container.appendChild(button);
}

window.application.blocks['levelsBlock'] = renderLevelsBlock;

function renderLevelsScreen() {
    app!.setAttribute('style', 'padding: 145px');

    if (window.application.interval) {
        const interval = window.application.interval;
        clearInterval(interval);
    }

    const levels = document.createElement('div');
    levels.classList.add('levels');

    const caption = document.createElement('h1');
    caption.classList.add('caption-main');
    caption.textContent = 'Выбери сложность';
    levels.appendChild(caption);

    window.application.renderBlock('levelsBlock', levels);
    // eslint-disable-next-line no-undef
    app!.appendChild(levels);
    pickingLevel();

    function pickingLevel() {
        const levelsBox = document.querySelector('.levels-box');
        const levelsArr = document.querySelectorAll('.level');

        levelsBox!.addEventListener('click', (event) => {
            levelsArr.forEach((level) => {
                level.classList.remove('level-active');
            });

            let activeLevel = event.target as HTMLElement;
            if (activeLevel.classList.contains('levels-box')) {
                activeLevel.classList.remove('level-active');
            } else {
                activeLevel.classList.add('level-active');
                window.application.level = activeLevel!.textContent;
            }
        });
    }
}

window.application.screens['levels'] = renderLevelsScreen;
window.application.renderScreen('levels');
