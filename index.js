const electron = require("electron");
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

//Listen for app to be ready

app.on("ready", function(){
    //create new window
    mainWindow = new BrowserWindow({});

    //load html file into window
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname, "mainWindow.html"),
        protocol:"file:",

        slashes: true
    }));

//Quit App when close
mainWindow.on("closed", function(){
    app.quit();
})

//Build menu from template
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)

//Insert menu
Menu.setApplicationMenu(mainMenu);

});

//Handle create add window
function createAddWindow(){
//create new window
addWindow = new BrowserWindow({
    width:300,
    height:200,
    title:"Add Shopping List Item"
});

//load html file into window
addWindow.loadURL(url.format({
    pathname:path.join(__dirname, "addWindow.html"),
    protocol:"file:",

    slashes: true
}));

//Garbage collection handle
addWindow.on("close", function(){
    addWindow = null;
})

}


//Create menu template
const mainMenuTemplate = [
    {
        label:"File",
        "submenu":[
            {
                label: "Add Item",
                click(){
                    createAddWindow();
                }
            },
            {
                label: "Clear Items"
            },
            {
                label: "Quit",
                accelerator: process.platform == "darwin" ? "Command+Q" : process.platform == "linux" ? "Control+Q" : "ctrl-q",
                click(){
                    app.quit();
                }
            }
        ]
    }
];

//if mac add empty object to menu
if(process.platform == "darwin"){
    mainMenuTemplate.unshift({});
}

//add Developer tool items if not in production
if(process.env.NODE_ENV !== "production"){
    mainMenuTemplate.push({
        label:"Developer Tools",

        submenu:[
            {
            label: "Toggle Devtools",
            accelerator: process.platform == "darwin" ? "Command+I" : process.platform == "linux" ? "Control+I" : "ctrl-i",
            click(item, focusedWindow){
                focusedWindow.toggleDevTools();
            }
        },
        {
            role:"reload"
            
        }
        ]
    })
}