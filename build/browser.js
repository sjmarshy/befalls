"use strict";

var BrowserWindow = require("browser-window");
var R = require("ramda");

function createWindow(options) {

  if (!options) {

    options = {};
  }

  return new BrowserWindow(options);
}

var loadURL__ = R.curry(function (browserWindow, url) {

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

  createWindow: createWindow,
  loadURL__: loadURL__
};
//# sourceMappingURL=browser.js.map