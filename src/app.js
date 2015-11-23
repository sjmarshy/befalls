/* eslint no-console: 0 */

const app = require("app");
const browser = require("./browser.js");
const crashReporter__ = require("crash-reporter");
const path = require("path");
const util = require("util");
const logfile = require("./logfile.js");
const store = require("./store.js");
const { fetchEntries } = require("./actions/entry.js");
const express = require("express");
const expressApp = express();
const server = require("http").Server(expressApp);
const io = require("socket.io")(server);

const DEFAULT_PORT = 8080;
const DEFAULT_LOGFILE_LOC = path.join(process.env.HOME, ".befalls.log");

const PORT = process.env.BEFALLS_PORT || DEFAULT_PORT;

crashReporter__.start();

let mainWindow = null;

process.on("unhandledRejection", (promise, reason) => {

  throw new Error(`unhandled rejection for promise ${promise}, reason: ${util.inspect(reason)}`);
});

server.listen(PORT, () => {

  console.log(`server is listening at localhost:${PORT}`);
});

expressApp.use(express.static(path.join(__dirname, "..", "public")));

app.on("ready", () => {

  let logfileLocation = process.env.BEFALLS_LOGFILE_LOC || DEFAULT_LOGFILE_LOC;

  logfile.ensureLogfileExists__(logfileLocation).then(() => {

    return store.dispatch(fetchEntries(logfileLocation));
  }).then(() => {

    mainWindow = browser.loadURL__(
        browser.createWindow(),
        "http://localhost:" + PORT);

    mainWindow;

  }).catch((e) => {

    console.error(e);
  });
});


io.on("connection", (socket) => {

  // temp
  socket.emit("hello");
});
