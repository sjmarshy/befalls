const  combineReducers  = require("redux").combineReducers;
const entry = require("./entry.js");
const util = require("./util.js");
const ui = require("./ui.js");
const { routeReducer } = require("redux-simple-router");

const rootReducer = combineReducers({
  entry,
  util,
  ui,
  routing: routeReducer
});

module.exports = rootReducer;
