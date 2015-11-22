const { combineReducers } = require("redux");
const entry = require("./entry.js");

const rootReducer = combineReducers({
  entry
});

module.exports = rootReducer;
