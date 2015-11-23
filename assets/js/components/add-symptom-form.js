const React = require("react");
const d = require("jsnox")(React);
const store = require("../store.js");
const addSymptom = require("../actions/entry.js").addSymptom;

module.exports = React.createClass({

  displayName: "ADD_SYMPTOM_FORM",

  getInitialState: () => {

    return {

      symptomName: "",
      symptomSeverity: 0
    };
  },

  updateSymptomName: function (e) {

    return this.setState({

      symptomName: e.target.value
    });
  },

  updateSymptomSeverity: function (e) {

    return this.setState({

      symptomSeverity: e.target.value
    });
  },

  onSubmitAddSymptomForm: function (e) {

    e.preventDefault();

    let socket = store.getState().util.get("socket");
    
    store.dispatch(addSymptom(socket, this.state.symptomName,
          this.state.symptomSeverity,
          Date.now()));
  },

  render: function () {

    return d("div[data-component='add-symptom-form']", {},
      d("form.addsymptomform", 
          { onSubmit: this.onSubmitAddSymptomForm },
          d("input.nameinput[type=text][name=name]", 
            {value: this.state.symptomName, onChange: this.updateSymptomName }),
          d("input.severityinput[type=range][max=10][name=severity]", 
            {value: this.state.symptomSeverity, onChange: this.updateSymptomSeverity}),
          d("input.submitbutton[type=submit]", {})));
  }
  
});
