"use strict";

var fruitObject = function() {
    this.alive = [];
    this.orange = new Image();
    this.blue = new Image();
    this.speed = [];
    this.fruitType = [];
    this.x = [];
    this.y = [];
    this.l = [];
    this.aneNo = [];
};
fruitObject.prototype.num = 30;

fruitObject.prototype.init = function() {
    for (let i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.fruitType[i] = "";
        this.speed[i] = Math.random() * 0.017 + 0.003;
    }
    this.orange.src = "./src/fruit.png";
    this.blue.src = "./src/blue.png";
};
fruitObject.prototype.draw = function() {
    let pic;
    for (let i = 0; i < this.num; i++) {
        if (this.alive[i] === true) {
            if (this.fruitType[i] === "orange")
                pic = this.orange;
            else if (this.fruitType[i] === "blue")
                pic = this.blue;
            if (this.l[i] < 20) {
                this.x[i] = ane.headx[this.aneNo[i]];
                this.y[i] = ane.heady[this.aneNo[i]];
                this.l[i] += this.speed[i] * deltaTime;
            } else {
                this.y[i] -= this.speed[i] * 7 * deltaTime;
            }
            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            if (this.y[i] < 20) {
                this.alive[i] = false;
            }
        }
    }
};
fruitObject.prototype.update = function() {
    let num = 0;
    for (let i = 0; i < this.num; i++) {
        if (this.alive[i])
            num++;
    }
};

fruitObject.prototype.dead = function(i) {
    this.alive[i] = false;
};

fruitObject.prototype.bron = function(i) {
    this.aneNo[i] = Math.floor(Math.random(Date.now()) * ane.num);
    this.l[i] = 0;
    this.alive[i] = true;
    if (Math.random() < 0.3) {
        this.fruitType[i] = "blue";
    } else this.fruitType[i] = "orange";
};

function fruitMonitor() { //监控食物状态
    let num = 0;
    for (let i = 0; i < fruit.num; i++) {
        if (fruit.alive[i])
            num++;
    }
    if (num < 15) {
        sendFruit();
        return;
    }
}

function sendFruit() {
    for (let i = 0; i < fruit.num; i++) {
        if (!fruit.alive[i]) {
            fruit.bron(i);
            return;
        }
    }
}