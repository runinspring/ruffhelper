var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.arrStars = [];
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.createGameScene();
        }
    };
    p.createGameScene = function () {
        var _this = this;
        var stageWidth = 730;
        var stageHeight = 530;
        var halfWidth = 365;
        var halfHeight = 265;
        var container = new egret.DisplayObjectContainer();
        this.addChild(container);
        var bg = new egret.Shape(); //背景色
        var max = new egret.Matrix();
        max.createGradientBox(stageWidth, stageHeight);
        bg.graphics.beginGradientFill(egret.GradientType.RADIAL, [0x292931, 0x000000], [1, 1], [0, 255], max);
        bg.graphics.drawRect(0, 0, stageWidth, stageHeight);
        bg.graphics.endFill();
        container.addChild(bg);
        var speedNum = 14000;
        var c1_2 = new egret.Bitmap(RES.getRes('c1-2_png')); //第1圈-短
        c1_2.blendMode = egret.BlendMode.ADD;
        c1_2.x = halfWidth;
        c1_2.y = halfHeight;
        c1_2.rotation = -20;
        c1_2.anchorOffsetY = -148;
        container.addChild(c1_2);
        egret.Tween.get(c1_2, { loop: true }).to({ rotation: 340 }, 20000);
        var c1_1 = new egret.Bitmap(RES.getRes('c1-1_png')); //第1圈-长
        c1_1.blendMode = egret.BlendMode.ADD;
        c1_1.x = halfWidth;
        c1_1.y = halfHeight;
        c1_1.anchorOffsetX = 186;
        c1_1.anchorOffsetY = 186;
        container.addChild(c1_1);
        egret.Tween.get(c1_1, { loop: true }).to({ rotation: 360 }, 5000);
        var c2_1 = new egret.Bitmap(RES.getRes('c2_png')); //第2圈
        c2_1.blendMode = egret.BlendMode.ADD;
        c2_1.x = halfWidth;
        c2_1.y = halfHeight;
        c2_1.anchorOffsetX = 40;
        c2_1.anchorOffsetY = 164;
        container.addChild(c2_1);
        egret.Tween.get(c2_1, { loop: true }).to({ rotation: -360 }, speedNum);
        var c2_2 = new egret.Bitmap(RES.getRes('c2_png')); //第2圈
        c2_2.blendMode = egret.BlendMode.ADD;
        c2_2.x = halfWidth;
        c2_2.y = halfHeight;
        c2_2.scaleX = -1;
        c2_2.anchorOffsetX = 40;
        c2_2.anchorOffsetY = 164;
        container.addChild(c2_2);
        egret.Tween.get(c2_2, { loop: true }).to({ rotation: 360 }, speedNum);
        var c3 = new egret.Bitmap(RES.getRes('c3_png')); //第3圈
        c3.x = halfWidth;
        c3.y = halfHeight;
        c3.rotation = 180;
        c3.anchorOffsetX = 131;
        c3.anchorOffsetY = 124;
        container.addChild(c3);
        egret.Tween.get(c3, { loop: true }).to({ rotation: -180 }, speedNum);
        var c4 = new egret.Bitmap(RES.getRes('c4_png')); //第4圈
        c4.x = halfWidth;
        c4.y = halfHeight;
        c4.anchorOffsetX = 4;
        c4.anchorOffsetY = 108;
        container.addChild(c4);
        egret.Tween.get(c4, { loop: true }).to({ rotation: 360 }, speedNum + 4000);
        var c5_1 = new egret.Bitmap(RES.getRes('c5-1_png')); //第5圈
        c5_1.blendMode = egret.BlendMode.ADD;
        c5_1.x = halfWidth;
        c5_1.y = halfHeight;
        c5_1.scaleX = -1;
        // c5_1.anchorOffsetX = 4;
        c5_1.anchorOffsetY = 62;
        container.addChild(c5_1);
        egret.Tween.get(c5_1, { loop: true }).to({ rotation: 360 }, speedNum);
        var c5_2 = new egret.Bitmap(RES.getRes('c5-2_png'));
        c5_2.blendMode = egret.BlendMode.ADD;
        c5_2.x = halfWidth;
        c5_2.y = halfHeight;
        c5_2.rotation = 50;
        c5_2.anchorOffsetX = 98;
        c5_2.anchorOffsetY = 100;
        container.addChild(c5_2);
        egret.Tween.get(c5_2, { loop: true }).to({ rotation: -310 }, speedNum);
        var c5_3 = new egret.Bitmap(RES.getRes('c5-3_png'));
        c5_3.blendMode = egret.BlendMode.ADD;
        c5_3.x = halfWidth;
        c5_3.y = halfHeight;
        c5_3.anchorOffsetX = 3;
        c5_3.anchorOffsetY = -22;
        container.addChild(c5_3);
        egret.Tween.get(c5_3, { loop: true }).to({ rotation: 360 }, speedNum);
        var c5_3_1 = new egret.Bitmap(RES.getRes('c5-3_png'));
        c5_3_1.blendMode = egret.BlendMode.ADD;
        c5_3_1.x = halfWidth;
        c5_3_1.y = halfHeight;
        c5_3_1.rotation = -50;
        c5_3_1.anchorOffsetX = 3;
        c5_3_1.anchorOffsetY = -22;
        container.addChild(c5_3_1);
        egret.Tween.get(c5_3_1, { loop: true }).to({ rotation: -410 }, speedNum);
        var c5_4 = new egret.Bitmap(RES.getRes('c5-4_png'));
        c5_4.blendMode = egret.BlendMode.ADD;
        c5_4.x = halfWidth;
        c5_4.y = halfHeight;
        c5_4.rotation = -120;
        c5_4.anchorOffsetX = 28;
        c5_4.anchorOffsetY = -18;
        container.addChild(c5_4);
        egret.Tween.get(c5_4, { loop: true }).to({ rotation: 240 }, speedNum);
        var c6_1 = new egret.Bitmap(RES.getRes('c6-1_png'));
        c6_1.blendMode = egret.BlendMode.ADD;
        c6_1.x = halfWidth;
        c6_1.y = halfHeight;
        c6_1.rotation = -100;
        c6_1.anchorOffsetY = -129;
        container.addChild(c6_1);
        egret.Tween.get(c6_1, { loop: true }).to({ rotation: -460 }, speedNum);
        var c6_2 = new egret.Bitmap(RES.getRes('c6-2_png'));
        c6_2.blendMode = egret.BlendMode.ADD;
        c6_2.x = halfWidth;
        c6_2.y = halfHeight;
        c6_2.anchorOffsetY = -147;
        container.addChild(c6_2);
        egret.Tween.get(c6_2, { loop: true }).to({ rotation: 360 }, speedNum);
        var c6_3 = new egret.Bitmap(RES.getRes('c6-3_png'));
        c6_3.blendMode = egret.BlendMode.ADD;
        c6_3.x = halfWidth;
        c6_3.y = halfHeight;
        c6_3.rotation = 120;
        c6_3.anchorOffsetY = -56;
        container.addChild(c6_3);
        egret.Tween.get(c6_3, { loop: true }).to({ rotation: -240 }, speedNum);
        var c6_3_1 = new egret.Bitmap(RES.getRes('c6-3_png'));
        c6_3_1.blendMode = egret.BlendMode.ADD;
        c6_3_1.x = halfWidth;
        c6_3_1.y = halfHeight;
        c6_3_1.anchorOffsetY = -56;
        container.addChild(c6_3_1);
        egret.Tween.get(c6_3_1, { loop: true }).to({ rotation: -360 }, speedNum);
        //顶部的圈圈
        var topCircle = new egret.Bitmap(RES.getRes("bg_png"));
        topCircle.blendMode = egret.BlendMode.ADD;
        // topCircle.width = stageWidth;
        // topCircle.height = stageHeight;
        container.addChild(topCircle);
        var timeNow = new Date().getTime();
        for (var i = 0; i < 60; i++) {
            var star = new Star(i, timeNow);
            star.x = halfWidth;
            star.y = halfHeight;
            this.arrStars.push(star);
            container.addChild(star);
        }
        this.addEventListener(egret.Event.ENTER_FRAME, function () {
            var time = new Date().getTime();
            _this.moveStars(time);
        }, this);
    };
    p.moveStars = function (time) {
        for (var i = 0, len = this.arrStars.length; i < len; i++) {
            this.arrStars[i].onMove(time);
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
