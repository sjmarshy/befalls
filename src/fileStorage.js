"use strict";

const fs = require("fs");
const e = require("./errors.js");

function stat(path) {

  return new Promise((res, rej) => {

    fs.stat(path, (err, stats) => {

      if (err) { 

        return rej(err);
      } else {

        return res(stats);
      }
    });
  });
}

function write(loc, contents) {

  return new Promise((res, rej) => {

    fs.writeFile(loc, contents, (err) => {

      if (err) {

        return rej(err);
      } else {

        return res(true);
      }
    });
  });
}

function createStorageFile(loc) {

  return stat(loc).then((stats) => {

    if (stats.isFile()) {

      throw new e.FileExistsError();
    } else {

      write(loc, "[]");

      return true;
    }

  }).catch((e) => {

    if (e.message.search(/ENOENT/) !== -1) {

      write(loc, "[]");
      return true;
    } else {

      throw e;
    }
  });
}

function readFile(loc) {
  
  return new Promise((res, rej) => {

    fs.readFile(loc, (err, data) => {

      if (err) {

        return rej(err);
      } else {

        return res(data);
      }
    });
  });
}

module.exports = {
  createStorageFile,
  readFile,
  write
};
