##发布流程

1. 修改 app/package.json 里的版本号
2. config.js 里要设置为发布版本
3. npm run deploy 发布最终版
4. http-server 启动本地服务器，使用electron本地镜像，避免翻墙。zip包要预先放到这个路径下：/RuffHelper/build/electronzip/0.37.6/electron-v0.37.6-win32-ia32.zip
5. 淘宝镜像地址
https://npm.taobao.org/mirrors/electron
6. 把 build/prelease 和 release 文件夹里的内容全部删除
7. gulp 在win和mac平台各执行一次，所有的安装包全部自动生成。
win 平台生成win32和win64位的
mac 平台成成mac和linux的

##打包的注意事项
需要全局安装的包

```
npm install asar -g 
npm install gulp -g
npm install http-server -g
npm install electron-packager -g
```

注意 app 文件夹内一定不能有中文名的文件

```
tree-kill 包内 killPid 方法
process 要改为 window.process
```

mac 图标的后缀为 icns

win 图标的后缀为 ico

asar 打包的 app 文件夹内必须有个package.json文件，表明启动文件--"main": "index.js"


