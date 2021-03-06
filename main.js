/* eslint no-path-concat: 0, func-names:0 */
var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');
var globalShortcut = require('global-shortcut');
var menu;
var template;

require('electron-debug')({
  showDevTools: true
});
require('crash-reporter').start();


var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit();
});


app.on('ready', function() {

  // Register a 'ctrl+u' shortcut listener.
  var ret = globalShortcut.register('ctrl+u', function() {
    console.log('ctrl+u is pressed');
  });

  if (!ret) {
    console.log('registration failed');
  }

  

  mainWindow = new BrowserWindow({ width: 1024, height: 728, "title-bar-style": "hidden-inset" });


  // Register a 'command+left-arrow' shortcut listener.
  var exposeOnTop = globalShortcut.register('cmd+u', function() {
    console.log('command + left arrow is pressed');
    // Haven't figure out how to call the left arrow button yet.
    if (mainWindow.isAlwaysOnTop(true)){
      mainWindow.hide();
      mainWindow.setAlwaysOnTop(false);
      mainWindow.setPosition(originalPosition);
    } else {
      // We should get the previous window position, save it and then reset when a user undoes this 
      // var originalPosition = mainWindow.getPosition();
      // console.log(mainWindow.getPosition())
      mainWindow.show();
      mainWindow.setAlwaysOnTop(true);
      mainWindow.setPosition(0,0);
      mainWindow.setSize(400, 2000);
      mainWindow.focus();
    }
  });

  console.log(globalShortcut.isRegistered('cmd+u'));


  if (process.env.HOT) {
    mainWindow.loadUrl('file://' + __dirname + '/app/hot-dev-app.html');
  } else {
    mainWindow.loadUrl('file://' + __dirname + '/app/app.html');
  }

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  }

  if (process.platform === 'darwin') {
    template = [{
      label: 'Electron',
      submenu: [{
        label: 'About ElectronReact',
        selector: 'orderFrontStandardAboutPanel:'
      }, {
        type: 'separator'
      }, {
        label: 'Services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: 'Hide ElectronReact',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() {
          app.quit();
        }
      }]
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      }, {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      }, {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      }, {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      }, {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      }]
    }, {
      label: 'View',
      submenu: [{
        label: 'Reload',
        accelerator: 'Command+R',
        click: function() {
          mainWindow.restart();
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click: function() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click: function() {
          mainWindow.toggleDevTools();
        }
      }]
    }, {
      label: 'Window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click: function() {
          require('shell').openExternal('http://electron.atom.io');
        }
      }, {
        label: 'Documentation',
        click: function() {
          require('shell').openExternal('https://github.com/atom/electron/tree/master/docs#readme');
        }
      }, {
        label: 'Community Discussions',
        click: function() {
          require('shell').openExternal('https://discuss.atom.io/c/electron');
        }
      }, {
        label: 'Search Issues',
        click: function() {
          require('shell').openExternal('https://github.com/atom/electron/issues');
        }
      }]
    }];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = [{
      label: '&File',
      submenu: [{
        label: '&Open',
        accelerator: 'Ctrl+O'
      }, {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click: function() {
          mainWindow.close();
        }
      }]
    }, {
      label: '&View',
      submenu: [{
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click: function() {
          mainWindow.restart();
        }
      }, {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click: function() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click: function() {
          mainWindow.toggleDevTools();
        }
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click: function() {
          require('shell').openExternal('http://electron.atom.io');
        }
      }, {
        label: 'Documentation',
        click: function() {
          require('shell').openExternal('https://github.com/atom/electron/tree/master/docs#readme');
        }
      }, {
        label: 'Community Discussions',
        click: function() {
          require('shell').openExternal('https://discuss.atom.io/c/electron');
        }
      }, {
        label: 'Search Issues',
        click: function() {
          require('shell').openExternal('https://github.com/atom/electron/issues');
        }
      }]
    }];
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
});
