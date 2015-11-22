"use strict";

var _require = require("../actions/entry.js");

var ADD_ENTRY = _require.ADD_ENTRY;
var RECEIVE_ENTRIES = _require.RECEIVE_ENTRIES;
var ADD_ENTRY_SUCCESS = _require.ADD_ENTRY_SUCCESS;
var ADD_ENTRY_FAIL = _require.ADD_ENTRY_FAIL;
var GET_ENTRIES_FAIL = _require.GET_ENTRIES_FAIL;
var GET_ENTRIES = _require.GET_ENTRIES;

var _require2 = require("immutable");

var fromJS = _require2.fromJS;

module.exports = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? fromJS({

    entries: fromJS({}),
    addingEntries: false,
    error: "" }) : arguments[0];
  var action = arguments[1];

  switch (action.type) {

    case ADD_ENTRY:

      return state.set("addingEntries", true);

    case RECEIVE_ENTRIES:

      return state.set("gettingEntries", false).set("entries", fromJS(action.entries));

    case GET_ENTRIES:

      return state.set("gettingEntries", true);

    case GET_ENTRIES_FAIL:

      return state.merge({ "gettingEntries": false, error: action.error });

    case ADD_ENTRY_SUCCESS:

      var nstate = state.set("addingEntries", false);

      return nstate.set("entries", state.get("entries").set(action.timeCreated, {

        type: action.trackingType,
        name: action.name,
        severity: action.severity,
        timeCreated: action.timeCreated }));

    case ADD_ENTRY_FAIL:

      return state.merge({ addingEntries: false, error: action.error });

    default:

      return state;
  }
};
//# sourceMappingURL=entry.js.map