/* eslint no-console: 0 */

const app = require("app");
const browser = require("./browser.js");
const crashReporter__ = require("crash-reporter");
const path = require("path");
const util = require("util");
const logfile = require("./logfile.js");
const store = require("./store.js");
const { fetchEntries } = require("./actions/entry.js");

crashReporter__.start();

let mainWindow = null;

process.on("unhandledRejection", (promise, reason) => {

  throw new Error(`unhandled rejection for promise ${promise}, reason: ${util.inspect(reason)}`);
});

app.on("ready", () => {

  let logfileLocation = process.env.BEFALLS_LOGFILE_LOC ||path.join( __dirname , "history.log");

  logfile.ensureLogfileExists__(logfileLocation).then(() => {

    return store.dispatch(fetchEntries(logfileLocation));
  }).then(() => {

    mainWindow = browser.loadURL__(
        browser.createWindow(),
        "file://" + __dirname + "/public/index.html");

    mainWindow;

  }).catch((e) => {

    console.error(e);
  });
});
