(()=>{window.application={blocks:{},screens:{},levels:["1","2","3"],renderScreen:function(e){window.application.screens[e]?(n.innerHTML="",this.screens[e]()):console.warn("Такого экрана нет")},renderBlock:function(n,e){window.application.blocks[n]?this.blocks[n](e):console.warn("Такого блока нет")}};const n=document.querySelector(".app")})();