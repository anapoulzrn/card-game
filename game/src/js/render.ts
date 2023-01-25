export const app = document.querySelector('.app');
console.log('render');
window.application = {
    blocks: {},
    screens: {},

    renderScreen: function (screenName: string) {
        if (!window.application.screens[screenName]) {
            console.warn('Такого экрана нет');
        } else {
            app!.innerHTML = '';
            this.screens[screenName]();
        }
    },

    renderBlock: function (blockName: string, container: HTMLElement) {
        if (!window.application.blocks[blockName]) {
            console.warn('Такого блока нет');
        } else {
            this.blocks[blockName](container);
        }
    },
};
