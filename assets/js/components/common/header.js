const React = require("react");
const d = require("jsnox")(React);
const { Link } = require("react-router");

module.exports = React.createClass({

  render: function () {
    
    return d("header.befalls-header", {},

        d("div.pagetitlewrapper", {}, 
          d("p.pagetitle", {}, this.props.ui.get("pageTitle"))),

        d("div.pagelinkswrapper", {}, 
          d(Link, {to: "/"}, "add symptom")));
  }
});
