const React = require("react");
const d = require("jsnox")(React);

const AddSymptomForm = require("./add-symptom-form.js");

module.exports = React.createClass({

  displayName: "ADD_SYMPTOM",

  render() {

    return d("div[data-component=add-symptom]", {},
        d("h2.title", {}, "Add Symptom"),
        d(AddSymptomForm, {}));
  }
});
