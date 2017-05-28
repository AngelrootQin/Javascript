"use strict"
var babyObject = function() {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.babyEye = new Image(); //绑定图片
    this.babyBody = new Image();
    this.babyTail = new Image();
};
babyObject.prototype.init = function() {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.babyEye.src = "./src/babyEye0.png";
    this.babyBody.src = "./src/babyFade0.png";
    this.babyTail.src = "./src/babyTail0.png";
};
babyObject.prototype.draw = function() {
    this.x = lerpDistance(mom.x, this.x, 0.9);
    this.y = lerpDistance(mom.y, this.y, 0.9);
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    this.angle = beta;
    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(this.babyEye, -this.babyEye.width * 0.5, -this.babyEye.height * 0.5);
    ctx1.drawImage(this.babyBody, -this.babyBody.width * 0.5, -this.babyBody.height * 0.5);
    ctx1.drawImage(this.babyTail, this.babyTail.width * 0.5, -this.babyTail.height * 0.5);
    ctx1.restore();
};