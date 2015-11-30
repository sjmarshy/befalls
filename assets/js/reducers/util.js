const ADD_SOCKET = require("../actions/util.js").ADD_SOCKET;
const fromJS = require("immutable").fromJS;

const initialState = fromJS({});

module.exports = (state = initialState, action) => {

  switch(action.type) {

  case ADD_SOCKET:

    return state.set("socket", action.socket);

  default:
    return state;
  }
};
