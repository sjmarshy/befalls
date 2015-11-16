"use strict";

const app = require("app");
const BrowserWindow = require("browser-window");
const crashReporter = require("crash-reporter");

crashReporter.start();

let mainWindow = null;

app.on("ready", () => {

  mainWindow = new BrowserWindow({});

  mainWindow.loadURL("file://" + __dirname + "/public/index.html");

  mainWindow.on("closed", () => {

  });
});
