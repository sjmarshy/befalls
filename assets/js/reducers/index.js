const  combineReducers  = require("redux").combineReducers;
const entry = require("./entry.js");
const util = require("./util.js");

const rootReducer = combineReducers({
  entry,
  util
});

module.exports = rootReducer;
