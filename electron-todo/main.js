const electron = require("electron");
const url = require("url");
const path = require("path");


const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow, addWindow;
let todoList = [];

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, // Electron 10 ve sonrasında gereklidir
      contextIsolation: false, // Electron 12 ve sonrasında gereklidir
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "pages/mainWindow.html"),
      protocol: "file:",
      slashes: true
    })
  );

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  ipcMain.on("newTodo:close", () => {
    addWindow.close();
    addWindow = null;
  });

  ipcMain.on("newTodo:save", (event,data) => {
    if(data) {

      todoList.push({
        id:todoList.length+1,
        text:data
      })
     mainWindow.webContents.send("todo:addItem",todoList)
   
   
      addWindow.close() 
      addWindow=null;
    }
    
  });

  ipcMain.on("removeTodo:id",(event,data)=> {

    removeTodoById(data)

  })


});

const mainMenuTemplate = [
  {
    label: "Dosya",
    submenu: [
      {
        label: "Yeni To do ekle",
        click() {
          createAddWindow();
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
  }
];

if (process.platform == "darwin") {
  mainMenuTemplate.unshift({
    label: app.getName(),
    role: "TODO"
  });
}

if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
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
  });
}

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 490,
    height: 220,
    title: "Add Todo",
    webPreferences: {
      nodeIntegration: true, // Electron 10 ve sonrasında gereklidir
      contextIsolation: false, // Electron 12 ve sonrasında gereklidir
    },
  });

  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "pages/newTodo.html"),
      protocol: "file:",
      slashes: true
    })
  );

  addWindow.on('close', () => {
    addWindow = null;
  });
}


function getTodoList(){
  console.log(todoList);
}

function removeTodoById(id) {
  todoList = todoList.filter(todo => todo.id !== id);
}