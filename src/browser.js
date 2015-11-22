"use strict";

const BrowserWindow = require("browser-window");
const R = require("ramda");

function createWindow(options) {

  if (!options) {

    options = {};
  }
  
  return new BrowserWindow(options);
}

const loadURL__ = R.curry((browserWindow, url) => {

  if (!url) {

    url = "";
  }

  if (browserWindow) {

    browserWindow.loadURL(url);

    return browserWindow;
  } else {
    
    throw new Error("no browser window provided");
  }
});

module.exports = {

  createWindow,
  loadURL__
};
