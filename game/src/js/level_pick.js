function renderLevelsBlock(container) {
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
            console.log('переход на экран игры');
            window.application.renderScreen('game');
        }
    });

    container.appendChild(levelsBox);
    container.appendChild(button);
}

window.application.blocks['levelsBlock'] = renderLevelsBlock;

function renderLevelsScreen() {
    const levels = document.createElement('div');
    levels.classList.add('levels');

    const caption = document.createElement('h1');
    caption.classList.add('caption-main');
    caption.textContent = 'Выбери сложность';
    levels.appendChild(caption);

    window.application.renderBlock('levelsBlock', levels);
    // eslint-disable-next-line no-undef
    app.appendChild(levels);
    pickingLevel();
}

window.application.screens['levels'] = renderLevelsScreen;
window.application.renderScreen('levels');

function pickingLevel() {
    const levelsBox = document.querySelector('.levels-box');
    const levelsArr = document.querySelectorAll('.level');

    levelsBox.addEventListener('click', (event) => {
        levelsArr.forEach((level) => {
            level.classList.remove('level-active');
        });

        let activeLevel = event.target;
        activeLevel.classList.add('level-active');
        window.application.level = activeLevel.textContent;
        console.log(window.application.level);
    });
}
