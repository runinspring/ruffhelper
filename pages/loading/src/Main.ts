class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.createGameScene();
        }
    }

    private arrStars: Star[] = [];
    private createGameScene(): void {
        var stageWidth = 730;
        var stageHeight = 530;
        var halfWidth = 365;
        var halfHeight = 265;
        var container = new egret.DisplayObjectContainer();
        this.addChild(container);
        

        

        
        var bg = new egret.Shape();//背景色
        var max = new egret.Matrix();
        max.createGradientBox(stageWidth,stageHeight);
        bg.graphics.beginGradientFill(egret.GradientType.RADIAL,[0x292931,0x000000],[1,1],[0,255],max);
        bg.graphics.drawRect(0, 0, stageWidth, stageHeight);
        bg.graphics.endFill();
        container.addChild(bg);

        

        var c1_2 = new egret.Bitmap(RES.getRes('c1-2_png'));//第1圈-短
        c1_2.x = halfWidth;
        c1_2.y = halfHeight;
        c1_2.rotation = -20;
        c1_2.anchorOffsetY = -148;
        container.addChild(c1_2);
        egret.Tween.get(c1_2,{loop:true}).to({rotation:340},20000);
        var c1_1 = new egret.Bitmap(RES.getRes('c1-1_png'));//第1圈-长
        c1_1.x = halfWidth;
        c1_1.y = halfHeight;
        c1_1.anchorOffsetX = 186;
        c1_1.anchorOffsetY = 186;
        container.addChild(c1_1);
        egret.Tween.get(c1_1,{loop:true}).to({rotation:360},5000);

        var c2_1 = new egret.Bitmap(RES.getRes('c2_png'));//第2圈
        c2_1.x = halfWidth;
        c2_1.y = halfHeight;
        c2_1.anchorOffsetX = 40;
        c2_1.anchorOffsetY = 164;
        container.addChild(c2_1);
        egret.Tween.get(c2_1,{loop:true}).to({rotation:-360},20000);

        var c2_2 = new egret.Bitmap(RES.getRes('c2_png'));//第2圈
        c2_2.x = halfWidth;
        c2_2.y = halfHeight;
        c2_2.scaleX = -1;
        c2_2.anchorOffsetX = 40;
        c2_2.anchorOffsetY = 164;
        container.addChild(c2_2);
        egret.Tween.get(c2_2,{loop:true}).to({rotation:360},20000);

        var c3 = new egret.Bitmap(RES.getRes('c3_png'));//第3圈
        c3.x = halfWidth;
        c3.y = halfHeight;
        c3.anchorOffsetX = 131;
        c3.anchorOffsetY = 127;
        container.addChild(c3);
        egret.Tween.get(c3,{loop:true}).to({rotation:-360},20000);

        var c4 = new egret.Bitmap(RES.getRes('c4_png'));//第4圈
        c4.x = halfWidth;
        c4.y = halfHeight;
        c4.anchorOffsetY = 108;
        container.addChild(c4);
        egret.Tween.get(c4,{loop:true}).to({rotation:360},18000);

        //顶部的圈圈
        var topCircle = new egret.Bitmap(RES.getRes("bg_png"));
        // topCircle.width = stageWidth;
        // topCircle.height = stageHeight;
        container.addChild(topCircle);

        var timeNow = new Date().getTime();
        for (var i = 0; i < 60; i++) {
            var star = new Star(i,timeNow);
            star.x = halfWidth;
            star.y = halfHeight;
            this.arrStars.push(star);
            container.addChild(star);
        }
        
        this.addEventListener(egret.Event.ENTER_FRAME, () => {
            var time = new Date().getTime();
            this.moveStars(time);
        }, this);

    }
    private moveStars(time:number) {
        for (var i = 0, len = this.arrStars.length; i < len; i++){
            this.arrStars[i].onMove(time);
        }
    }
}


