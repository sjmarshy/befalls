/* eslint no-console:0 */
"use strict";

const fs__ = require("./fileStorage.js");
const R = require("ramda");

function ensureLogfileExists__(name) {

  return fs__.createStorageFile(name).catch(() => {

    return true;
  });
}

const addEntryToFile__ = R.curry((loc, trackingType, name, severity, timeCreated) => {

  return fs__.readFile(loc).then((dataString) => {

    if (dataString.length > 0) {

      let dataArray = JSON.parse(dataString);

      dataArray.push({

        trackingType,
        name,
        severity,
        timeCreated
      });

      return fs__.write(loc, JSON.stringify(dataArray));
    } else {

      throw new Error("logfile does not exist");
    }
  }).catch((e) => {

    console.error(e);
  });
});

const getEntries__ = (loc) => {

  return fs__.readFile(loc).then((dataString) => {

    if (dataString.length > 0) {

      return JSON.parse(dataString);
    } else {

      throw new Error(`datafile at ${loc} appears to be empty`);
    }
  });
};

module.exports = {

  ensureLogfileExists__,
  addEntryToFile__,
  getEntries__
};
