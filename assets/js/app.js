const React = require("react");
const ReactDOM = require("react-dom");
const d = require("jsnox")(React);

const TestApp = React.createClass({

  render: function () {
    
    return d("div.app", {}, "hey buddy");
  }
  
});

ReactDOM.render(d(TestApp, {}), document.querySelector("[data-app]"));
