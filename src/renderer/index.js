// Initial welcome page. Delete the following line to remove it.
// 'use strict';const styles=document.createElement('style');styles.innerText=`@import url(https://unpkg.com/spectre.css/dist/spectre.min.css);.empty{display:flex;flex-direction:column;justify-content:center;height:100vh;position:relative}.footer{bottom:0;font-size:13px;left:50%;opacity:.9;position:absolute;transform:translateX(-50%);width:100%}`;const vueScript=document.createElement('script');vueScript.setAttribute('type','text/javascript'),vueScript.setAttribute('src','https://unpkg.com/vue'),vueScript.onload=init,document.head.appendChild(vueScript),document.head.appendChild(styles);function init(){Vue.config.devtools=false,Vue.config.productionTip=false,new Vue({data:{versions:{electron:process.versions.electron,electronWebpack:require('electron-webpack/package.json').version}},methods:{open(b){require('electron').shell.openExternal(b)}},template:`<div><div class=empty><p class="empty-title h5">Welcome to your new project!<p class=empty-subtitle>Get qwdqwd now and take advantage of the great documentation at hand.<div class=empty-action><button @click="open('https://webpack.electron.build')"class="btn btn-primary">Documentation</button> <button @click="open('https://electron.atom.io/docs/')"class="btn btn-primary">Electron</button><br><ul class=breadcrumb><li class=breadcrumb-item>electron-webpack v{{ versions.electronWebpack }}</li><li class=breadcrumb-item>electron v{{ versions.electron }}</li></ul></div><p class=footer>This intitial landing page can be easily removed from <code>src/renderer/index.js</code>.</p></div></div>`}).$mount('#app')}

const video = `
<!-- <video id="gl_video" autoplay playsinline width="0" height="0"></video> -->
<div id="btn">
<button id="btn_start">start</button>
<button id="btn_pause">pause</button>
<button id="btn_resume">resume</button>
<button id="btn_stop">stop</button>
</div>
<style>
html{
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
}
body{
    width: 100p%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    // overflow: hidden;
}
app{
    width: 0px;
    height: 0px;
    margin: 0px;
    padding: 0px;
}
/* video{
    width: 0px;
    height: 0px;
    margin: 0px;
    padding: 0px;
} */
#btn{
    position: absolute;
    margin: 0px;
    padding: 0px;
}
</style>
`
console.log(app);
app.innerHTML = video
require('./js/lib')