"use strict";
var aneObject = function() {
    this.x = [];
    this.y = [];
};
aneObject.prototype.num = 50;
//初始化
aneObject.prototype.init = function() {
    for (let i = 0, n = this.num; i < n; i++) {
        this.x[i] = i * 16 + Math.random() * 20;
        this.y[i] = 200 + Math.random() * 20;
    }
};
/**
 * beginPath(): 起始一条路径，或重置当前路径
 * moveTo():把路径移动到画布中的指定点，不创建线条
 * lineTo()：添加一个新点，然后在画布中创建从该点到最后指定点的线条
 * stroke()：绘制已定义的路径
 * save()：用来保存Canvas的状态,save()方法之后的代码，可以调用Canvas的平移、放缩、旋转、裁剪等操作！
 * restore()：用来恢复Canvas之前保存的状态,防止save()方法代码之后对Canvas执行的操作，继续对后续的绘制会产生影响，通过该方法可以避免连带的影响！
 */
aneObject.prototype.draw = function() {
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 20;
    ctx2.strokeStyle = "#3b154e";
    ctx2.lineCap = "round";
    for (let i = 0, n = this.num; i < n; i++) {
        ctx2.beginPath();
        ctx2.moveTo(this.x[i], canHeight);
        ctx2.lineTo(this.x[i], canHeight - this.y[i]);
        ctx2.stroke();
    }
    ctx2.restore();
};