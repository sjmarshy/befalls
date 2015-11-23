const ADD_ENTRY = "ADD_ENTRY";
const m = require("../../../src/shared/messages.js");

function addEntry(trackingType, name, severity, timeCreated) {
  
  return {
    type: ADD_ENTRY,
    trackingType,
    name,
    severity,
    timeCreated
  };
}

function addSymptom(socket, name, severity, timeCreated) {

  return (dispatch) => {


    let messageNo = Date.now();

    socket.emit(m.ADD_ENTRY, {

      trackingType: "symptom",
      name,
      severity,
      timeCreated,
      messageNo
    });

    socket.on("ACK:" + messageNo, () => {

      dispatch(addEntry("symptom", name, severity, timeCreated));
      socket.off("ACK:" + messageNo);
    });
  };
}

module.exports = {

  ADD_ENTRY,

  addEntry,
  addSymptom
};
