class Star extends egret.DisplayObjectContainer {
    private id: number = 0;
    private bmp: egret.Bitmap;
    private time: number;
    private radius = 200;
    constructor(id: number, time: number) {
        super();
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
    public onMove(time: number) {
        var angle = this.getAngle(time);
        this.bmp.x = this.radius * Math.cos(angle);
        this.bmp.y = this.radius * Math.sin(angle);
    }
    private getAngle(timeNow): number {
        var dt = timeNow - this.time;
        if (Math.floor(dt / 5000) % 2 == 0) {//向外扩张
            this.radius = 200 + dt % 5000 * 0.006;
        } else {//向内扩张
            //最大值为 5000*间隔值+200
            this.radius = 230 - dt % 5000 * 0.006;
        }
        var angle = (this.id * 360 / 60 + dt * 0.004) * 6.28 / 360;
        return angle;
    }

}