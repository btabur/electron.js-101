const electron = require("electron");
const url = require("url");
const path = require("path");


const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

app.on("ready",()=> {

    mainWindow = new BrowserWindow({
        webPreferences: {
          nodeIntegration: true, // Electron 10 ve sonrasında gereklidir
          contextIsolation: false, // Electron 12 ve sonrasında gereklidir
        },
      //  frame:false  ->> çerçeveyi kaldırır sol üst köşe deki kapat aşağı indir kısmını yok eder
      });
      mainWindow.setResizable(false)
      //pencerenin oluşturulması
      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, "pages/mainWindow.html"),
          protocol: "file:",
          slashes: true
        })
      );
      //menunun oluşrueulması
      const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
      Menu.setApplicationMenu(mainMenu);
})

const mainMenuTemplate = [
    {
      label: "Dosya",
      submenu: [
        {
          label: "Yeni To do ekle",
          click(){
            createWindow()
          }

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
            label: "Geliştirici Araçları",
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
       width:490,
       height:220,
       title:"Add Todo",

    });
    addWindow.setResizable(false)

    addWindow.loadURL(url.format({
       pathname:path.join(__dirname,"pages/newTodo.html"),
       protocol:"file",
       slashes:true

    }));

    addWindow.on('close',()=> {
       addWindow= null
    })

}