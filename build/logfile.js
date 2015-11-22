/* eslint no-console:0 */
"use strict";

var fs__ = require("./fileStorage.js");
var R = require("ramda");

function ensureLogfileExists__(name) {

  return fs__.createStorageFile(name).catch(function () {

    return true;
  });
}

var addEntryToFile__ = R.curry(function (loc, trackingType, name, severity, timeCreated) {

  return fs__.readFile(loc).then(function (dataString) {

    if (dataString.length > 0) {

      var dataArray = JSON.parse(dataString);

      dataArray.push({

        trackingType: trackingType,
        name: name,
        severity: severity,
        timeCreated: timeCreated
      });

      return fs__.write(loc, JSON.stringify(dataArray));
    } else {

      throw new Error("logfile does not exist");
    }
  }).catch(function (e) {

    console.error(e);
  });
});

var getEntries__ = function getEntries__(loc) {

  return fs__.readFile(loc).then(function (dataString) {

    if (dataString.length > 0) {

      return JSON.parse(dataString);
    } else {

      throw new Error("datafile at " + loc + " appears to be empty");
    }
  });
};

module.exports = {

  ensureLogfileExists__: ensureLogfileExists__,
  addEntryToFile__: addEntryToFile__,
  getEntries__: getEntries__
};
//# sourceMappingURL=logfile.js.map