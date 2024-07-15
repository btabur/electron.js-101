const electron = require("electron");
const url = require("url");
const path = require("path");


const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, // Electron 10 ve sonrasında gereklidir
      contextIsolation: false, // Electron 12 ve sonrasında gereklidir
    }
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "main.html"),
      protocol: "file:",
      slashes: true
    })
  );

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  ipcMain.on("key", (event, data) => { // 'err' parametresini 'event' olarak değiştirdim
    console.log(data);
  });

  ipcMain.on("key:inputValue",(event,data)=> {
    console.log(data);
  })

  // yeni pencere
  ipcMain.on("key:newWindow",()=> {
    createWindow()
  })

  mainWindow.on("close",()=> {
    app.quit();
  })
});

const mainMenuTemplate = [
  {
    label: "Dosya",
    submenu: [
      {
        label: "Yeni To do ekle"
      },
      {
        label: "Tümünü Sil"
      },
      {
        label: "Çıkış",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        role: "quit"
      }
    ]
  },
];

if (process.platform == "darwin") {
  mainMenuTemplate.unshift({
    label: app.getName(),
    role: "TODO"
  });
}

if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push(
    {
      label: "Dev Tools",
      submenu: [
        {
          label: "Geliştirici Penceresini Aç",
          click(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.toggleDevTools();
            }
          }
        },
        {
          label: "Yenile",
          role: "reload"
        }
      ]
    }
  );
}


function createWindow(){
     addWindow = new BrowserWindow({
        width:482,
        height:200,
        title:"Yeni Pecere",

     });

     addWindow.loadURL(url.format({
        pathname:path.join(__dirname,"modal.html"),
        protocol:"file",
        slashes:true

     }));

     addWindow.on('close',()=> {
        addWindow= null
     })

}