"use strict";

var fs = require("fs");
var e = require("./errors.js");

function stat(path) {

  return new Promise(function (res, rej) {

    fs.stat(path, function (err, stats) {

      if (err) {

        return rej(err);
      } else {

        return res(stats);
      }
    });
  });
}

function write(loc, contents) {

  return new Promise(function (res, rej) {

    fs.writeFile(loc, contents, function (err) {

      if (err) {

        return rej(err);
      } else {

        return res(true);
      }
    });
  });
}

function createStorageFile(loc) {

  return stat(loc).then(function (stats) {

    if (stats.isFile()) {

      throw new e.FileExistsError();
    } else {

      write(loc, "[]");

      return true;
    }
  }).catch(function (e) {

    if (e.message.search(/ENOENT/) !== -1) {

      write(loc, "[]");
      return true;
    } else {

      throw e;
    }
  });
}

function readFile(loc) {

  return new Promise(function (res, rej) {

    fs.readFile(loc, function (err, data) {

      if (err) {

        return rej(err);
      } else {

        return res(data);
      }
    });
  });
}

module.exports = {
  createStorageFile: createStorageFile,
  readFile: readFile,
  write: write
};
//# sourceMappingURL=fileStorage.js.map