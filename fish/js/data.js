var dataObject = function() {
    this.fruitNum = 0;
    this.double = 1;
    this.score = 0;
    this.gameOver = false;
    this.Alpha = 0;
    ctx1.fillStyle = "white";
    ctx1.font = "20px";
    ctx1.textAlign = "center";
};
dataObject.prototype.reset = function() {
    this.fruitNum = 0;
    this.double = 1;
};
dataObject.prototype.draw = function() { //分值的绘制
    let w = canWidth;
    let h = canHeight;
    // ctx1.fillText("Num: " + this.fruitNum, w * 0.5, h - 50);
    // ctx1.fillText("Double: " + this.double, w * 0.5, h - 80);
    ctx1.fillText("Score: " + this.score, w * 0.5, h - 50);
    if (data.gameOver) {
        this.Alpha += deltaTime * 0.0001;
        if (this.Alpha > 1)
            this.Alpha = 1;
        ctx1.fillStyle = "rgba(255,255,255" + this.Alpha + ")";
        ctx1.fillText("GAME OVER", w * 0.5, h * 0.5);
    }
};
dataObject.prototype.addScore = function() {
    this.score += this.double * this.fruitNum;
    data.reset();
}