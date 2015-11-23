/* globals io */

const React = require("react");
const ReactDOM = require("react-dom");
const d = require("jsnox")(React);
const m = require("../../src/shared/messages.js");
const store = require("./store.js");
const AddSymptomForm = require("./components/add-symptom-form.js");
const addSocket = require("./actions/util.js").addSocket;

const PORT = 8080;

const socket = io.connect("http://localhost:" + PORT);

store.dispatch(addSocket(socket));

socket.on(m.GET_ENTRIES, (entries) => {

  console.log(entries);
});

const TestApp = React.createClass({

  render: function () {
    
    return d(AddSymptomForm, {});
  }
  
});

ReactDOM.render(d(TestApp, {}), document.querySelector("[data-app]"));
