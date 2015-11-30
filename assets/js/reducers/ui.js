const { fromJS } = require("immutable");

const initialState = fromJS({

  pageTitle: "Befalls: a symptom tracker"
});

module.exports = (state = initialState, action) => {

  switch(action.type) {

  default:
    return state;
  }
};
