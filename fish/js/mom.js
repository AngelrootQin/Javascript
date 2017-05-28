var momObject = function() {
    this.x = 0;
    this.y = 0;
    this.angle = 0; //鱼头与x轴的夹角
    this.bigEye = new Image(); //大鱼眼睛
    this.bigBody = new Image(); //大鱼身体
    this.bigTail = new Image(); //大鱼尾巴
};
//初始化
momObject.prototype.init = function() {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angel = 0;
    this.bigEye.src = "./src/bigEye0.png"; //为大鱼绑定图片资源
    this.bigBody.src = "./src/bigSwim0.png";
    this.bigTail.src = "./src/bigTail0.png";
};
//画大鱼
momObject.prototype.draw = function() {
    this.x = lerpDistance(mx, this.x, 0.9); //使大鱼的运动变得平滑
    this.y = lerpDistance(my, this.y, 0.9);
    let deltaY = my - this.y;
    let deltaX = mx - this.x;
    let beta = Math.atan2(deltaY, deltaX) + Math.PI; //计算偏转的角度
    this.angle = beta;
    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(this.bigEye, -this.bigEye.width * 0.5, -this.bigEye.height * 0.5);
    ctx1.drawImage(this.bigBody, -this.bigBody.width * 0.5, -this.bigBody.height * 0.5);
    ctx1.drawImage(this.bigTail, this.bigTail.width * 0.5, -this.bigTail.height * 0.5);
    ctx1.restore();
};

function momFruitCllision() {
    for (var i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) {
            var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
            if (l < 900)
                fruit.dead(i);
        }
    }
}