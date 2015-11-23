const ADD_SOCKET = require("../actions/util.js").ADD_SOCKET;
const fromJS = require("immutable").fromJS;

module.exports = (state = fromJS({}), action) => {

  switch(action.type) {

  case ADD_SOCKET:

    return state.set("socket", action.socket);

  default:
    return state;
  }
};
