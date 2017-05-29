var waveObj = function() {
    this.x = [];
    this.y = [];
    this.alive = [];
    this.r = [];
}

waveObj.prototype.num = 10;
waveObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
    }
}

waveObj.prototype.draw = function() {
    ctx1.save();
    ctx1.lineWdith = 2.5;
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = "white"

    for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            this.r[i] += deltaTime * 0.5;
            if (this.r[i] > 60)
                this.r[i] = 60;
            let alpha = 1 - this.r[i] / 60;
            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
            ctx1.closePath();
            ctx1.strokeStyle = "rgba(255,255,255," + alpha + ")";
            ctx1.stroke();
            this.alive[i] = false;
        }
    }
    ctx1.restore();
}

waveObj.prototype.born = function(x, y) {
    for (var i = 0; i < this.num; i++) {
        if (!this.alive[i]) {
            this.alive[i] = true;
            this.x[i] = x;
            this.y[i] = y;
            this.r[i] = 20;
            return;
        }
    }
}