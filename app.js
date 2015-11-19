"use strict";

const app = require("app");
const browser = require("./lib/browser.js");
const crashReporter__ = require("crash-reporter");
const fs__ = require("./lib/fileStorage.js");
const R = require("ramda");
const path = require("path");
const util = require("util");
const e = require("./lib/errors.js");

crashReporter__.start();

let mainWindow = null;

function ensureLogfileExists__(name) {

  return fs__.createStorageFile(name).catch(() => {

    return true;
  });
}

const addEntryToFile__ = R.curry((loc, key, val) => {

  return fs__.readFile(loc).then((dataString) => {

    if (dataString.length > 0) {

      let dataArray = JSON.parse(dataString);

      if (dataArray.length === 0) {

        dataArray.push({

          key,
          val,
          timestamp: Date.now()
        });
      } else {

        if (R.filter((x) => x.key === key, dataArray).length > 0) { 

          throw new e.KeyExistsError("key already exists");
        } else {

          dataArray.push({

            key,
            val,
            timestamp: Date.now()
          });
        }
      }

      return fs__.write(loc, JSON.stringify(dataArray));
    } else {
      
      throw new Error("logfile appears to be empty");
    }
  }).catch((e) => {

    throw e;
  });
});

process.on("unhandledRejection", (promise, reason) => {

  throw new Error(`unhandled rejection for promise ${promise}, reason: ${util.inspect(reason)}`);
});

app.on("ready", () => {

  let logfileLocation = process.env.BEFALLS_LOGFILE_LOC ||path.join( __dirname , "history.log");

  ensureLogfileExists__(logfileLocation);

  mainWindow = browser.loadURL__(
      browser.createWindow(),
      "file://" + __dirname + "/public/index.html");

  mainWindow;

  addEntryToFile__(logfileLocation, "test", "data").catch((err) => {

    if (!(err instanceof e.KeyExistsError)) {

      throw err;
    }
  });
});
