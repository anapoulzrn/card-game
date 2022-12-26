window.application = {
  blocks: {},
  screens: {},
  levels: ['1', '2', '3'],
  // timers: [],
  renderScreen: function (screenName) {
    // window.application.timers.forEach(id => {
    //     clearInterval(id);
    // });

    if (!window.application.screens[screenName]) {
      console.warn("Такого экрана нет");
    } else {
      app.innerHTML = '';
      this.screens[screenName]();
    }
  },

  renderBlock: function (blockName, container) {
    if (!window.application.blocks[blockName]) {
      console.warn("Такого блока нет");
    } else {
      this.blocks[blockName](container);
    }
  },
}

const app = document.querySelector('.app');
