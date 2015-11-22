"use strict";

var _require = require("redux");

var createStore = _require.createStore;
var applyMiddleware = _require.applyMiddleware;

var thunkMiddleware = require("redux-thunk");
var createLogger = require("redux-logger");
var rootReducer = require("./reducers/index.js");

var loggerMiddleware = createLogger({ logger: console });

var createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);

module.exports = createStoreWithMiddleware(rootReducer);
//# sourceMappingURL=store.js.map