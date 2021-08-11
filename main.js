const { app, BrowserWindow } = require('electron');
// 判断运行环境,是开发环境还是生产环境
const isDev = require('electron-is-dev');
let mainWindow;


const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    webPreferences: {
      nodeIntegration: true, // 是否可以使用node能力
      contextIsolation: false, // 上下文是否封闭
      enableRemoteModule: true, // 是否可以使用remote模块
    }
  })
  // 判断环境，配置加载的页面
  const url = isDev ? 'http://localhost:3000' : 'undetermined'
  mainWindow.loadURL(url)
  // 打开调试工具
  mainWindow.webContents.openDevTools()
}

// 监听ready事件后，初始化窗口
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  mainWindow.on('closed', () => {
    mainWindow = null;
  })
})
// 对mac系统最特殊处理
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
