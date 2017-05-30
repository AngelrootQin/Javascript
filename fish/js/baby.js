"use strict";

var babyObject = function() {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.babyEye = []; //小鱼眼睛图片数组
    this.babyBody = []; //小鱼身体图片数组 
    this.babyTail = []; //小鱼尾巴图片数组 

    this.babyTailTimer = 0;
    this.babyTailCount = 0; //记录当前帧应该播放的大鱼尾巴的图片序列

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0; //记录当前帧应该播放的大鱼眼睛的图片序列
    this.babyEyeInterval = 1000;

    this.babyBodyTimer = 0; //记录当前帧应该播放的大鱼身体的图片序列
    this.babyBodyCount = 0;
};
babyObject.prototype.init = function() {
    this.x = canWidth * 0.5 + 50;
    this.y = canHeight * 0.5 - 50;
    //初始化小鱼尾巴图片数组 
    for (let i = 0; i < 8; i++) {
        this.babyTail[i] = new Image();
        this.babyTail[i].src = "./src/babyTail" + i + ".png";
    }
    //初始化小鱼眼睛图片数组
    for (let i = 0; i < 2; i++) {
        this.babyEye[i] = new Image();
        this.babyEye[i].src = "./src/babyEye" + i + ".png";
    }
    //初始化小鱼身体图片数组 
    for (let i = 0; i < 20; i++) {
        this.babyBody[i] = new Image();
        this.babyBody[i].src = "./src/babyFade" + i + ".png";
    }
};
/**
 * save()：用来保存Canvas的状态,save()方法之后的代码，可以调用Canvas的平移、放缩、旋转、裁剪等操作！
 * restore()：用来恢复Canvas之前保存的状态,防止save()方法代码之后对Canvas执行的操作，继续对后续的绘制会产生影响，通过该方法可以避免连带的影响！
 * rotate():旋转当前绘图
 * translate():	重新映射画布上的 (0,0) 位置
 */
babyObject.prototype.draw = function() {
    this.x = lerpDistance(mom.x, this.x, 0.99);
    this.y = lerpDistance(mom.y, this.y, 0.99);
    let deltaY = mom.y - this.y;
    let deltaX = mom.x - this.x;
    let beta = Math.atan2(deltaY, deltaX) + Math.PI;
    this.angle = beta;
    //鱼尾巴
    this.babyTailTimer += deltaTime;
    if (this.babyTailTimer > 50) {
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        this.babyTailTimer %= 50;
    }
    let babyTail = this.babyTail[this.babyTailCount];

    //鱼眼睛
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
    let babyEye = this.babyEye[this.babyEyeCount];

    //鱼身体
    this.babyBodyTimer += deltaTime;
    if (this.babyBodyTimer > 200) {
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 200;
        if (this.babyBodyCount > 19) {
            this.babyBodyCount = 19;
            data.gameOver = true;
        }
    }
    let babyBody = this.babyBody[this.babyBodyCount];

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(babyBody, -babyBody.width * 0.5, -babyBody.height * 0.5);
    ctx1.drawImage(babyEye, -babyEye.width * 0.5, -babyEye.height * 0.5);
    ctx1.drawImage(babyTail, babyTail.width * 0.5, -babyTail.height * 0.5);
    ctx1.restore();
};