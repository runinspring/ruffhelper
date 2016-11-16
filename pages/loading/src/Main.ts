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
        var bg = new egret.Shape();
        var stageWidth = 730;
        var stageHeight = 530;
        var halfWidth = 365;
        var halfHeight = 265;
        bg.graphics.beginFill(0x000000);
        bg.graphics.drawRect(0, 0, stageWidth, stageHeight);
        // console.log(this.stage.stageWidth,this.stage.stageHeight)
        bg.graphics.endFill();
        this.addChild(bg);
        var timeNow = new Date().getTime();
        for (var i = 0; i < 60; i++) {
            var star = new Star(i,timeNow);
            star.x = halfWidth;
            star.y = halfHeight;
            this.arrStars.push(star);
            this.addChild(star);
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


