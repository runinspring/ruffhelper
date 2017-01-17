const electron = require('electron');
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const {app} = electron; // Module to control application life.
const {BrowserWindow} = electron; // Module to create native browser window.
var mainWindow = null;
// var appIcon = null;
// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    app.quit();
    // if (process.platform != 'darwin') {
    //
    // }
});

// var version = '0.1.0'
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
    // Create the browser window.
    //center 在屏幕中间显示  resizable 不可以调整大小
    //icon dock  区域显示的图标
    //appIcon = new Tray('./assets/images/icon.png');
    //console.log(appIcon)
    //mainWindow = new BrowserWindow({width: 730, height: 530,
    var version = app.getVersion()
    mainWindow = new BrowserWindow({
        width: 730, height: 530,
        title: "RuffHelper  " + version,
        center: true, resizable: false, useContentSize: true
    });
    //cosnole.log(123,Menu)
    var menu = new Menu();
    menu.append(new MenuItem({
        role: 'window',
        label: 'RuffHelper',
        submenu: [
            {label: 'Copy',accelerator: 'CmdOrCtrl+C',role: 'copy'},
            {label: 'Cut',accelerator: 'CmdOrCtrl+X',role: 'cut'},
            {label: 'Paste',accelerator: 'CmdOrCtrl+V',role: 'paste'},
            {label: 'Select All',accelerator: 'CmdOrCtrl+A',role: 'selectall'},
            {label: 'Undo',accelerator: 'CmdOrCtrl+Z',role: 'undo'},
            {label: 'Redo',accelerator: 'Shift+CmdOrCtrl+Z',role: 'redo'},
            {type: 'separator'},
            {label: 'author: coolgods@sina.com'},
            {type: 'separator'},
        ]
    }))
    if (process.platform == 'darwin') {//mac 平台替换菜单
        Menu.setApplicationMenu(menu);
    }

    mainWindow.on('page-title-updated', function (event) {
        //阻止替换标题
        event.preventDefault();
    })
    //
    //mainWindow.setRepresentedFilename('./assets/images/icon.png')
    //appIcon.setToolTip('This is my application.');
    //console.log(1231,mainWindow.id)
    // and load the index.html of the app.
    //从指定位置加载
    mainWindow.loadURL('file://' + __dirname + '/index_public.html');
    // mainWindow.title = "RuffHelper  "+version;
    //var appIcon = new Tray('/assets/images/icon.png');
    //从服务器位置加载
    // mainWindow.loadURL("http://localhost:8080");
    //window.onresize = function(){
    //  var wid = document.documentElement.clientWidth;
    //  var hei = document.documentElement.clientHeight;
    //  console.log(wid,hei);
    //}
    // Open the DevTools.
    // mainWindow.openDevTools();//调试面板
    //mainWindow.setMenu(null);//清除菜单
    //mainWindow.setMenuBarVisibility(false);//隐藏顶部的选项条
    mainWindow.setContentSize(730, 530);//重新设置窗口大小

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    //mainWindow.on('resize', function() {
    //  // Dereference the window object, usually you would store windows
    //  // in an array if your app supports multi windows, this is the time
    //  // when you should delete the corresponding element.
    //  console.log(1212,app.getAppPath())
    //});

});
