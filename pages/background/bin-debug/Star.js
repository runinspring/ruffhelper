var Star = (function (_super) {
    __extends(Star, _super);
    function Star(id, time) {
        _super.call(this);
        this.id = 0;
        this.radius = 200;
        this.id = id;
        this.time = time;
        var bmp = new egret.Bitmap(RES.getRes("star_png"));
        bmp.anchorOffsetX = 3;
        bmp.anchorOffsetY = 3;
        this.bmp = bmp;
        this.addChild(bmp);
        var alpha = id * 6.28 / 60;
        bmp.x = this.radius * Math.cos(alpha);
        bmp.y = this.radius * Math.sin(alpha);
    }
    var d = __define,c=Star,p=c.prototype;
    p.onMove = function (time) {
        var angle = this.getAngle(time);
        this.bmp.x = this.radius * Math.cos(angle);
        this.bmp.y = this.radius * Math.sin(angle);
    };
    p.getAngle = function (timeNow) {
        var dt = timeNow - this.time;
        if (Math.floor(dt / 5000) % 2 == 0) {
            this.radius = 200 + dt % 5000 * 0.006;
        }
        else {
            //最大值为 5000*间隔值+200
            this.radius = 230 - dt % 5000 * 0.006;
        }
        var angle = (this.id * 360 / 60 + dt * 0.004) * 6.28 / 360;
        return angle;
    };
    return Star;
}(egret.DisplayObjectContainer));
egret.registerClass(Star,'Star');
