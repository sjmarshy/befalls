"use strict";

var ADD_ENTRY = "ADD_ENTRY";
var ADD_ENTRY_SUCCESS = "ADD_ENTRY_SUCCESS";
var ADD_ENTRY_FAIL = "ADD_ENTRY_FAIL";
var GET_ENTRIES = "GET_ENTRIES";
var GET_ENTRIES_FAIL = "GET_ENTRIES_FAIL";
var RECEIVE_ENTRIES = "RECEIVE_ENTRIES";

var _require = require("../logfile.js");

var addEntryToFile__ = _require.addEntryToFile__;
var getEntries__ = _require.getEntries__;

function addEntrySuccess(trackingType, name, severity, timeCreated) {

  return {

    type: ADD_ENTRY_SUCCESS,
    trackingType: trackingType,
    name: name,
    severity: severity,
    timeCreated: timeCreated
  };
}

function addEntryFail(error) {

  return {

    type: ADD_ENTRY_FAIL,
    error: error.message
  };
}
function addEntry(logfileLocation, trackingType, name, severity, timeCreated) {

  return function (dispatch) {

    dispatch({
      type: ADD_ENTRY
    });

    // here we need to save this to a file
    addEntryToFile__(logfileLocation, trackingType, name, severity, timeCreated).then(function () {

      return dispatch(addEntrySuccess(trackingType, name, severity, timeCreated));
    }).catch(function (e) {

      return dispatch(addEntryFail(e));
    });
  };
}

function addSymptom(logfileLocation, name, severity) {
  var timeCreated = arguments.length <= 3 || arguments[3] === undefined ? Date.now() : arguments[3];

  return addEntry(logfileLocation, "SYMPTOM", name, severity, timeCreated);
}

function getEntries() {

  return {
    type: GET_ENTRIES
  };
}

function receiveEntries(entries) {
  return {

    type: RECEIVE_ENTRIES,
    entries: entries
  };
}

function getEntriesFail(e) {

  return {

    type: GET_ENTRIES_FAIL,
    error: e
  };
}

function fetchEntries(logfileLocation) {

  return function (dispatch) {

    dispatch(getEntries());

    getEntries__(logfileLocation).then(function (entries) {

      dispatch(receiveEntries(entries));
    }).catch(function (e) {

      dispatch(getEntriesFail(e));
    });
  };
}

module.exports = {

  GET_ENTRIES: GET_ENTRIES,
  RECEIVE_ENTRIES: RECEIVE_ENTRIES,
  ADD_ENTRY: ADD_ENTRY,
  ADD_ENTRY_SUCCESS: ADD_ENTRY_SUCCESS,
  ADD_ENTRY_FAIL: ADD_ENTRY_FAIL,

  addEntry: addEntry,
  getEntries: getEntries,
  receiveEntries: receiveEntries,
  addSymptom: addSymptom,
  addEntrySuccess: addEntrySuccess,
  addEntryFail: addEntryFail,
  fetchEntries: fetchEntries
};
//# sourceMappingURL=entry.js.map