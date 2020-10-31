// import PixiJS
import * as PIXI from 'pixi.js'
import Device from './device/device'
import Media from './media'

// create app (default WebGL)
const app = new PIXI.Application({
    //backgroundColor: '0x000000', // 背景顏色
    antialias: false, // 反鋸齒
    transparent: false, // 透明
    // resolution: window.devicePixelRatio || 1
    // resizeTo: document.querySelector('body'),
    // autoDensity: true
    forceCanvas: false
});

// app.view: HTMLCanvasElement
document.body.appendChild(app.view);

// Init Class from import
const device = new Device(app.view);
const media = new Media();

// window size
let w = window.innerWidth
let h = window.innerHeight
app.renderer.resize(w, h);
addEventListener('resize', () => {
    w = window.innerWidth;
    h = window.innerHeight;

    app.renderer.resize(w, h);

    // app.stage.width = w;
    // app.stage.height = h;
})

const rendererType = ["CANAVAS", "WEBGL", "UNKNOWN"]

console.log("isWebGLSupported:" + PIXI.utils.isWebGLSupported());
console.log("app.renderer.type(number):" + app.renderer.type);
console.log("app.renderer.type(string):" + rendererType[app.renderer.type]);

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
    /*shark.scale.x *= 1.25;
    shark.scale.y *= 1.25;*/
});

// custom mouse cursor
const defaultIcon = "url('Diamond.png'),auto";
app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;

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

// Collision

/*const movementSpeed = 0.05;

const impulsePower = 5;

function testForAABB(object1, object2) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
}

function collisionResponse(object1, object2) {
    if (!object1 || !object2) {
        return new PIXI.Point(0);
    }

    const vCollision = new PIXI.Point(
        object2.x - object1.x,
        object2.y - object1.y,
    );

    const distance = Math.sqrt(
        (object2.x - object1.x) * (object2.x - object1.x)
        + (object2.y - object1.y) * (object2.y - object1.y),
    );

    const vCollisionNorm = new PIXI.Point(
        vCollision.x / distance,
        vCollision.y / distance,
    );

    const vRelativeVelocity = new PIXI.Point(
        object1.acceleration.x - object2.acceleration.x,
        object1.acceleration.y - object2.acceleration.y,
    );

    const speed = vRelativeVelocity.x * vCollisionNorm.x
        + vRelativeVelocity.y * vCollisionNorm.y;

    const impulse = impulsePower * speed / (object1.mass + object2.mass);

    return new PIXI.Point(
        impulse * vCollisionNorm.x,
        impulse * vCollisionNorm.y,
    );
}

function distanceBetweenTwoPoints(p1, p2) {
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;

    return Math.hypot(a, b);
}

const greenSquare = new PIXI.Sprite(PIXI.Texture.WHITE);
greenSquare.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2);
greenSquare.width = 100;
greenSquare.height = 100;
greenSquare.tint = '0x00FF00';
greenSquare.acceleration = new PIXI.Point(0);
greenSquare.mass = 3;

const redSquare = new PIXI.Sprite(PIXI.Texture.WHITE);
redSquare.position.set(0, 0);
redSquare.width = 100;
redSquare.height = 100;
redSquare.tint = '0xFF0000';
redSquare.acceleration = new PIXI.Point(0);
redSquare.mass = 1;

app.ticker.add((delta) => {
    redSquare.acceleration.set(redSquare.acceleration.x * 0.99, redSquare.acceleration.y * 0.99);
    greenSquare.acceleration.set(greenSquare.acceleration.x * 0.99, greenSquare.acceleration.y * 0.99);

    const mouseCoords = app.renderer.plugins.interaction.mouse.global;

    if (greenSquare.x < 0 || greenSquare.x > (app.screen.width - 100)) {
        greenSquare.acceleration.x = -greenSquare.acceleration.x;
    }

    if (greenSquare.y < 0 || greenSquare.y > (app.screen.height - 100)) {
        greenSquare.acceleration.y = -greenSquare.acceleration.y;
    }

    if ((greenSquare.x < -30 || greenSquare.x > (app.screen.width + 30))
        || greenSquare.y < -30 || greenSquare.y > (app.screen.height + 30)) {
        greenSquare.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2);
    }

    if (app.screen.width > mouseCoords.x || mouseCoords.x > 0
        || app.screen.height > mouseCoords.y || mouseCoords.y > 0) {
        const redSquareCenterPosition = new PIXI.Point(
            redSquare.x + (redSquare.width * 0.5),
            redSquare.y + (redSquare.height * 0.5),
        );

        const toMouseDirection = new PIXI.Point(
            mouseCoords.x - redSquareCenterPosition.x,
            mouseCoords.y - redSquareCenterPosition.y,
        );

        const angleToMouse = Math.atan2(
            toMouseDirection.y,
            toMouseDirection.x,
        );

        const distMouseRedSquare = distanceBetweenTwoPoints(
            mouseCoords,
            redSquareCenterPosition,
        );
        const redSpeed = distMouseRedSquare * movementSpeed;

        redSquare.acceleration.set(
            Math.cos(angleToMouse) * redSpeed,
            Math.sin(angleToMouse) * redSpeed,
        );
    }

    if (testForAABB(greenSquare, redSquare)) {
        const collisionPush = collisionResponse(greenSquare, redSquare);

        redSquare.acceleration.set(
            (collisionPush.x * greenSquare.mass),
            (collisionPush.y * greenSquare.mass),
        );
        greenSquare.acceleration.set(
            -(collisionPush.x * redSquare.mass),
            -(collisionPush.y * redSquare.mass),
        );
    }

    greenSquare.x += greenSquare.acceleration.x * delta;
    greenSquare.y += greenSquare.acceleration.y * delta;

    redSquare.x += redSquare.acceleration.x * delta;
    redSquare.y += redSquare.acceleration.y * delta;
});

app.stage.addChild(redSquare, greenSquare);*/

// Blur
/*const blurFilter1 = new PIXI.filters.BlurFilter();

shark.filters = [blurFilter1]; // 這段

let count = 0;

app.ticker.add((delta) => {
    count += 0.005;

    //const blurAmount = Math.cos(count);
    const blurAmount = Math.sin(count);

    blurFilter1.blur = 20 * (blurAmount);
});*/

// Color Matrix
/*const filter = new PIXI.filters.ColorMatrixFilter();

let count = 0;
let enabled = true;

app.stage.filters = [filter];

app.stage.on('click', () => {
    enabled = !enabled;
    app.stage.filters = enabled ? [filter] : null;
});

app.ticker.add((delta) => {
    shark.scale.x = 1 + Math.sin(count) * 0.04;
    shark.scale.y = 1 + Math.cos(count) * 0.04;

    count += 0.1;

    const { matrix } = filter;

    matrix[1] = Math.sin(count) * 3;
    matrix[2] = Math.cos(count);
    matrix[3] = Math.cos(count) * 1.5;
    matrix[4] = Math.sin(count / 3) * 2;
    matrix[5] = Math.sin(count / 2);
    matrix[6] = Math.sin(count / 4);
});*/

// Magnifying glass
const displacementSprite = PIXI.Sprite.from('displace.png');
app.stage.addChild(displacementSprite);
const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

shark.filters = [displacementFilter];
app.stage.filters = [displacementFilter];

displacementFilter.scale.x = 110;
displacementFilter.scale.y = 110;
displacementSprite.anchor.set(0.5);

const ring = PIXI.Sprite.from('ring.png');

ring.anchor.set(0.5);

ring.visible = false;

app.stage.addChild(ring);
app.stage.interactive = true;
app.stage
    .on('mousemove', onPointMove);

function onPointMove(eventData) {
    ring.visible = true;

    displacementSprite.position.set(
        eventData.data.global.x - 25,
        eventData.data.global.y);

    ring.position.copyFrom(displacementSprite.position);
}

