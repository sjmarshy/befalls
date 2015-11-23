const ADD_ENTRY = require("../actions/entry.js").ADD_ENTRY;
const fromJS = require("immutable").fromJS;

module.exports = (state = fromJS({

  entries: fromJS({}),
  fetchingEntries: true,
  error: ""
}), action) => {

  switch (action.type) {

  case ADD_ENTRY:

    return state.set("entries",
        state.get("entries").set(
          action.timeCreated, {
            type: action.trackingType,
            name: action.name,
            severity: action.severity,
            timeCreated: action.timeCreated }));

  default:
    return state;
  }
};
