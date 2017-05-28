"use strict";
document.body.onload = game;
var can1; // canvas
var can2;
var ctx1; //canvas context
var ctx2;
var ane;
var bgPic = new Image();
var canWidth; //画布的宽度
var canHeight; //画布的高度
var lastTime; //上一帧执行的时间
var deltaTime; //两帧间隔的时间差
function game() {
    init();
    drawBackground();
    gameloop();
}

function init() {
    //获得canvas context
    can1 = document.getElementById("canvas1"); //画布 fishes ,dust ,ui,circle
    can2 = document.getElementById("canvas2"); //background,friut,ane
    ctx1 = can1.getContext("2d"); //画笔1 
    ctx2 = can2.getContext("2d");
    bgPic.src = "./src/background.jpg";
    canWidth = can1.width;
    canHeight = can1.height;
    ane = new aneObject();
    ane.init();
}

function gameloop() {
    requestAnimationFrame(gameloop);
    drawBackground();
    ane.draw();

}