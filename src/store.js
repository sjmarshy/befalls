const { createStore, applyMiddleware } = require("redux");
const thunkMiddleware = require("redux-thunk");
const createLogger = require("redux-logger");
const rootReducer = require("./reducers/index.js");

const loggerMiddleware = createLogger({ logger: console });

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware)(createStore);

module.exports = createStoreWithMiddleware(rootReducer);
