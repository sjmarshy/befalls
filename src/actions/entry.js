const ADD_ENTRY = "ADD_ENTRY";
const ADD_ENTRY_SUCCESS = "ADD_ENTRY_SUCCESS";
const ADD_ENTRY_FAIL = "ADD_ENTRY_FAIL";
const GET_ENTRIES = "GET_ENTRIES";
const GET_ENTRIES_FAIL = "GET_ENTRIES_FAIL";
const RECEIVE_ENTRIES = "RECEIVE_ENTRIES";
const { addEntryToFile__, getEntries__ } = require("../logfile.js");

function addEntrySuccess(trackingType, name, severity, timeCreated) {

  return {

    type: ADD_ENTRY_SUCCESS,
    trackingType,
    name,
    severity,
    timeCreated
  };
}

function addEntryFail(error) {
  
  return {

    type: ADD_ENTRY_FAIL,
    error: error.message
  };
}
function addEntry(logfileLocation, trackingType, name, severity, timeCreated) {

  return (dispatch) => {

    dispatch({
      type: ADD_ENTRY
    });

    // here we need to save this to a file
    addEntryToFile__(logfileLocation, trackingType, name, severity, timeCreated).then(() => {


      return dispatch(addEntrySuccess(trackingType, name, severity, timeCreated));
    }).catch((e) => {

      return dispatch(addEntryFail(e));
    });
  };
}

function addSymptom(logfileLocation, name, severity, timeCreated = Date.now()) {
  
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
    entries
  };
}

function getEntriesFail(e) {
  
  return {

    type: GET_ENTRIES_FAIL,
    error: e
  };
}

function fetchEntries(logfileLocation) {

  return (dispatch) => {

    dispatch(getEntries());

    getEntries__(logfileLocation).then((entries) => {

      dispatch(receiveEntries(entries));
    }).catch((e) => {

      dispatch(getEntriesFail(e));
    });

  };
}

module.exports = {

  GET_ENTRIES,
  RECEIVE_ENTRIES,
  ADD_ENTRY,
  ADD_ENTRY_SUCCESS,
  ADD_ENTRY_FAIL,

  addEntry,
  getEntries,
  receiveEntries,
  addSymptom,
  addEntrySuccess,
  addEntryFail,
  fetchEntries
};
