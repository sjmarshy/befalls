"use strict";

function FileExistsError(message) {

  this.name = "FileExistsError";
  this.message = message || "Creation attempt failed, file already exists";
  this.stack = (new Error()).stack;
}

FileExistsError.prototype = Object.create(Error.prototype);
FileExistsError.prototype.constructor = FileExistsError;

function KeyExistsError(message) {
  this.name = "KeyExistsError";
  this.message = message || "Key already exists";
  this.stack = (new Error()).stack;
}

KeyExistsError.prototype = Object.create(Error.prototype);
KeyExistsError.prototype.constructor = KeyExistsError;

module.exports = {

  FileExistsError,
  KeyExistsError
};
