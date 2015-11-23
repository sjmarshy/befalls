const ADD_SOCKET = "ADD_SOCKET";

function addSocket(socket) {
  return {
    type: ADD_SOCKET,
    socket };
}

module.exports = {

  ADD_SOCKET,

  addSocket
};
