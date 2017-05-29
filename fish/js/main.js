document.body.onload = game; //程序入口
let can1; //画布
let can2;
let ctx1; //画笔
let ctx2;

let bgImage = new Image(); //背景图片

let canWidth; //画布的宽度
let canHeight; //画布的高度

let ane; //海草
let fruit; //食物
let mom; //大鱼对象
let baby; //小鱼对象
let wave;
let mx; //mx 鼠标x轴坐标、
let my; //my 鼠标y坐标 

let lastTime; //最后一帧的时间
let deltaTime; //两针之间的间隔

let data;

function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();

}

function init() {
    // 获得 canvas context
    can1 = document.getElementById("canvas1"); //fishes,dudt,UI,circle
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById("canvas2"); //backgroud,ane,fruits
    ctx2 = can2.getContext('2d');
    can1.addEventListener('mousemove', onMouseMove, false);
    bgImage.src = "./src/background.jpg";
    canWidth = can1.width;
    canHeight = can1.height;
    ane = new aneObject();
    ane.init();
    fruit = new fruitObject();
    fruit.init();
    mom = new momObject();
    mom.init();
    mx = canWidth;
    my = canHeight;
    baby = new babyObject();
    baby.init();
    data = new dataObject();
    wave = new waveObj();
    wave.init();
}

function gameloop() {
    requestAnimationFrame(gameloop);
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if (deltaTime > 40)
        deltaTime = 40;
    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();
    ctx1.clearRect(0, 0, canWidth, canHeight);
    mom.draw();
    baby.draw();
    momFruitCllision();
    momBabyCllision()
    data.draw();
    wave.draw();
}

function onMouseMove(e) {
    if (!data.gameOver) {
        if (e.dffSetS || e.layerX) {
            mx = e.offSetX === undefined ? e.layerX : e.offSetX;
            my = e.offSetY === undefined ? e.layerY : e.offSetY;
        }
    }
}