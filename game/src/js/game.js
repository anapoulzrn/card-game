function renderGameBlock(container) {
    console.log(container);
}

window.application.blocks['gameBlock'] = renderGameBlock;

function renderGameScreen() {
    console.log('тут будет экран игры');
}

window.application.screens['game'] = renderGameScreen;
