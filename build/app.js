"use strict";

/* eslint no-console: 0 */

var app = require("app");
var browser = require("./browser.js");
var crashReporter__ = require("crash-reporter");
var path = require("path");
var util = require("util");
var logfile = require("./logfile.js");
var store = require("./store.js");

var _require = require("./actions/entry.js");

var fetchEntries = _require.fetchEntries;

crashReporter__.start();

var mainWindow = null;

process.on("unhandledRejection", function (promise, reason) {

  throw new Error("unhandled rejection for promise " + promise + ", reason: " + util.inspect(reason));
});

app.on("ready", function () {

  var logfileLocation = process.env.BEFALLS_LOGFILE_LOC || path.join(__dirname, "history.log");

  logfile.ensureLogfileExists__(logfileLocation).then(function () {

    return store.dispatch(fetchEntries(logfileLocation));
  }).then(function () {

    mainWindow = browser.loadURL__(browser.createWindow(), "file://" + __dirname + "/public/index.html");

    mainWindow;
  }).catch(function (e) {

    console.error(e);
  });
});
//# sourceMappingURL=app.js.map