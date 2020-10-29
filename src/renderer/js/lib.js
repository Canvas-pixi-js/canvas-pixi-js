// import PixiJS
import * as PIXI from 'pixi.js'

// create app (default WebGL)
const app = new PIXI.Application({
    //backgroundColor: '0x000000', // 背景顏色
    antialias: true, // 反鋸齒
    transparent: false // 透明
});

// app.view: HTMLCanvasElement
document.body.appendChild(app.view);

const rendererType = ["CANAVAS", "WEBGL", "UNKNOWN"]

console.log("isWebGLSupported:" + PIXI.utils.isWebGLSupported());
console.log("app.renderer.type:" + rendererType[app.renderer.type]);

// PIXI Text
let text = new PIXI.Text('This is a PixiJS text',
    {
        fontFamily: 'Arial',
        fontSize: 64,
        fill: "#00ff00",
        align: 'center'
    }
);
app.stage.addChild(text)

// PIXI rectangle
let rectangle = new PIXI.Graphics();
rectangle.lineStyle(4, 0xFF3300, 1);
rectangle.beginFill(0x66CCFF);
rectangle.drawRect(0, 0, 64, 64);
rectangle.endFill();
rectangle.x = 170;
rectangle.y = 170;
app.stage.addChild(rectangle);

// PIXI rectangle
const r = PIXI.Sprite.from(PIXI.Texture.WHITE);
r.x = 250;
r.y = 150;
r.width = 300;
r.height = 200;
r.tint = 0x0000FF;
app.stage.addChild(r);

// shark image test🦈
const shark = PIXI.Sprite.from("./shark01.jpg") // static/xxx.png
shark.scale.set(0.5, 0.5);
shark.interactive = true;
shark.cursor = 'grab';
shark.visible = true;
// hitArea
// shark.hitArea = new PIXI.Rectangle(100, 100, shark.parent.width / 2, shark.parent.height / 2);
app.stage.addChild(shark);

// event
shark.on('click', (event) => {
    // alert('click shark');
    console.log('click shark');
});

shark.on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    // events for drag end
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
    // events for drag move
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove)

function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
}

/*app.ticker.add((delta) => {
    shark.rotation += 0.5 * delta;
});*/

// create circle
let circle = new PIXI.Graphics();
circle.beginFill(0xffCFF, 1);
circle.drawCircle(0, 0, 5); // x y r
circle.endFill();
r.addChild(circle);

// app.stage.addChild(circle);

// create star
/* let star = new PIXI.Graphics();
star.beginFill(0xffCFF, 0.5);
star.drawStar(app.view.width / 2, app.view.height / 2, 60);
star.endFill();
app.stage.addChild(star); */

// shark.visible = false;



// shark gif test🦈
const g_shark = PIXI.Sprite.from("tenor.gif") // static/xxx.png
g_shark.scale.set(0.5, 0.5);
g_shark.visible = true;
// app.stage.addChild(g_shark);