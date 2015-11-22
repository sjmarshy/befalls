const { 
  ADD_ENTRY,
  RECEIVE_ENTRIES,
  ADD_ENTRY_SUCCESS,
  ADD_ENTRY_FAIL,
  GET_ENTRIES_FAIL,
  GET_ENTRIES} = require("../actions/entry.js");
const { fromJS } = require("immutable");

module.exports = (state = fromJS({

  entries: fromJS({}),
  addingEntries: false,
  error: "" }), action) => {

  switch (action.type) {

  case ADD_ENTRY:

    return state.set("addingEntries", true);

  case RECEIVE_ENTRIES:

    return state.set("gettingEntries", false)
      .set("entries", fromJS(action.entries));

  case GET_ENTRIES:

    return state.set("gettingEntries", true);

  case GET_ENTRIES_FAIL:

    return state.merge({"gettingEntries": false, error: action.error });

  case ADD_ENTRY_SUCCESS: 

    let nstate =  state.set("addingEntries", false);

    return nstate.set("entries", state.get("entries").set(
          action.timeCreated, {

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
