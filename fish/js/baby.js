"use strict"
var babyObject = function() {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.babyEye = []; //小鱼眼睛图片数组
    this.babyBody = []; //小鱼身体图片数组 
    this.babyTail = []; //小鱼尾巴图片数组 

    this.babyTailTimer = 0;
    this.babyTailCount = 0;

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
};
babyObject.prototype.init = function() {
    this.x = canWidth * 0.5 + 50;
    this.y = canHeight * 0.5 - 50;
    for (let i = 0; i < 8; i++) {
        this.babyTail[i] = new Image();
        this.babyTail[i].src = "./src/babyTail" + i + ".png";
    }
    for (let i = 0; i < 2; i++) {
        this.babyEye[i] = new Image();
        this.babyEye[i].src = "./src/babyEye" + i + ".png";
    }
    for (let i = 0; i < 20; i++) {
        this.babyBody[i] = new Image();
        this.babyBody[i].src = "./src/babyFade" + i + ".png";
    }
};

babyObject.prototype.draw = function() {
    this.x = lerpDistance(mom.x, this.x, 0.99);
    this.y = lerpDistance(mom.y, this.y, 0.99);
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    this.angle = beta;
    this.babyTailTimer += deltaTime;
    if (this.babyTailTimer > 50) {
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        this.babyTailTimer %= 50;
    }
    this.babyEyeTimer += deltaTime;
    if (this.babyEyeTimer > this.babyEyeInterval) {
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;
        if (this.babyEyeCount == 0) {
            this.babyEyeInterval = Math.random() * 1500 + 2000;
        } else {
            this.babyEyeInterval = 200;
        }
    }

    this.babyBodyTimer += deltaTime;
    if (this.babyBodyTimer > 200) {
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 200;
        if (this.babyBodyCount > 19) {
            this.babyBodyCount = 19;
        }
    }


    let babyTail = this.babyTail[this.babyTailCount];
    let babyEye = this.babyEye[this.babyEyeCount];
    let babyBody = this.babyBody[this.babyBodyCount];

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(babyBody, -babyBody.width * 0.5, -babyBody.height * 0.5);
    ctx1.drawImage(babyEye, -babyEye.width * 0.5, -babyEye.height * 0.5);
    ctx1.drawImage(babyTail, babyTail.width * 0.5, -babyTail.height * 0.5);
    ctx1.restore();
};