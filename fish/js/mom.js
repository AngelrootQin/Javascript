var momObject = function() {
    this.x = 0;
    this.y = 0;
    this.angle = 0; //鱼头与x轴的夹角
    this.bigEye = []; //大鱼眼睛
    this.bigBodyBlue = [];
    this.bigBodyOra = []; //大鱼身体
    this.bigTail = []; //大鱼尾巴

    this.bigTailTimer = 0;
    this.bigTailCount = 0;


    this.bigEyeTimer = 0;
    this.bigEyeCount = 0;
    this.bigEyeInterval = 1000;

    this.bigBodyCount = 0;

};
//初始化
momObject.prototype.init = function() {
        this.x = canWidth * 0.5;
        this.y = canHeight * 0.5;
        this.angel = 0;
        for (let i = 0; i < 2; i++) {
            this.bigEye[i] = new Image();
            this.bigEye[i].src = "./src/bigEye" + i + ".png";
        }
        for (let i = 0; i < 8; i++) {
            this.bigTail[i] = new Image();
            this.bigTail[i].src = "./src/bigTail" + i + ".png";
        }
        for (let i = 0; i < 8; i++) {
            this.bigBodyBlue[i] = new Image();
            this.bigBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
            this.bigBodyOra[i] = new Image();
            this.bigBodyOra[i].src = "./src/bigSwim" + i + ".png";
        }
    }
    //画大鱼
momObject.prototype.draw = function() {
    this.x = lerpDistance(mx, this.x, 0.9); //使大鱼的运动变得平滑
    this.y = lerpDistance(my, this.y, 0.9);
    let deltaY = my - this.y;
    let deltaX = mx - this.x;
    let beta = Math.atan2(deltaY, deltaX) + Math.PI; //计算偏转的角度
    this.angle = beta;

    this.bigTailTimer += deltaTime;
    if (this.bigTailTimer > 50) {
        this.bigTailCount = (this.bigTailCount + 1) % 8;
        this.bigTailTimer %= 50;
    }
    let bigTail = this.bigTail[this.bigTailCount];

    this.bigEyeTimer += deltaTime;
    if (this.bigEyeTimer > this.bigEyeInterval) {
        this.bigEyeCount = (this.bigEyeCount + 1) % 2;
        this.bigEyeTimer %= this.bigEyeInterval;
        if (this.bigEyeCount === 0) {
            this.bigEyeInterval = Math.random() * 1500 + 2000;
        } else {
            this.bigEyeInterval = 200;
        }
    }
    let bigEye = this.bigEye[this.bigEyeCount];
    let bigBody;
    if (data.double === 1) {
        bigBody = this.bigBodyOra[this.bigBodyCount];
    } else {
        bigBody = this.bigBodyBlue[this.bigBodyCount];
    }

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(bigBody, -bigBody.width * 0.5, -bigBody.height * 0.5);
    ctx1.drawImage(bigEye, -bigEye.width * 0.5, -bigEye.height * 0.5);
    ctx1.drawImage(bigTail, bigTail.width * 0.5, -bigTail.height * 0.5);
    ctx1.restore();
};

function momFruitCllision() { //吃东西
    if (data.gameOver === false) {
        for (var i = 0; i < fruit.num; i++) {
            if (fruit.alive[i]) {
                var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
                if (l < 900) {
                    fruit.dead(i);
                    data.fruitNum++;
                    mom.bigBodyCount++;
                    if (mom.bigBodyCount > 7) {
                        mom.bigBodyCount = 7;
                    }
                    if (fruit.fruitType[i] === "blue") {
                        data.double = 2;
                    }
                    wave.born(fruit.x[i], fruit.y[i]);
                }
            }
        }
    }
}

function momBabyCllision() {
    if (data.fruitNum > 0 && data.gameOver === false) {
        let l = calLength2(baby.x, baby.y, mom.x, mom.y);
        if (l < 900) {
            baby.babyBodyCount = 0;
            data.addScore();
            mom.bigBodyCount = 0;
        }
    }
}