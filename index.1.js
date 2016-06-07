//const electron = require('electron');
//const app = electron.app;
//const Tray = electron.Tray;
const electron = require('electron');
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
var appIcon = null;
// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // console.log("process.platform :",process.platform )
  app.quit();
  // if (process.platform != 'darwin') {
  //
  // }
});

// var version = '0.1.0'
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  //center 在屏幕中间显示  resizable 不可以调整大小
  //icon dock  区域显示的图标
  //appIcon = new Tray('./assets/images/icon.png');
  //console.log(appIcon)
  //mainWindow = new BrowserWindow({width: 730, height: 530,
  var version = app.getVersion()
  mainWindow = new BrowserWindow({icon:'./assets/images/icon.png',width: 730, height: 530,
    title:"RuffHelper  "+version,
    center:true,resizable:false,useContentSize:true});
  //cosnole.log(123,Menu)
  var menu = new Menu();
  menu.append(new MenuItem({
    role:'window',
    label: 'RuffHelper',
    submenu: [
      {label:'author: coolgods@sina.com'},
      {type: 'separator'},
    ]
  }))
  Menu.setApplicationMenu(menu);
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
  // mainWindow.loadURL('file://' + __dirname + '/index_public.html');
  //mainWindow.loadURL('file://' + __dirname + '/app/index_public.html');
  //var appIcon = new Tray('/assets/images/icon.png');
  //从服务器位置加载
  mainWindow.loadURL("http://localhost:8080");
  //window.onresize = function(){
  //  var wid = document.documentElement.clientWidth;
  //  var hei = document.documentElement.clientHeight;
  //  console.log(wid,hei);
  //}
  // Open the DevTools.

  mainWindow.openDevTools();
  mainWindow.setMenu(null);//清除菜单
  //mainWindow.setMenuBarVisibility(false);//隐藏顶部的选项条
  mainWindow.setContentSize(730,530);//重新设置窗口大小

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
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
