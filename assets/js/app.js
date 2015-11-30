/* globals io */
require("!style!css!sass!../scss/index.scss");

const React = require("react");
const ReactDOM = require("react-dom");
const d = require("jsnox")(React);
const m = require("../../src/shared/messages.js");
const store = require("./store.js");
const addSocket = require("./actions/util.js").addSocket;
const { Router, Route, IndexRoute } = require("react-router");
const createBrowserHistory = require("history/lib/createBrowserHistory");
const { connect, Provider } = require("react-redux");
const AddSymptom = require("./components/add-symptom.js");
const Header = require("./components/common/header.js");

const PORT = 8080;

const socket = io.connect("http://localhost:" + PORT);

store.dispatch(addSocket(socket));

socket.on(m.GET_ENTRIES, (entries) => {

  console.log("entries ", entries);
});

const App = React.createClass({

  render() {

    return d("div.that-which-befalls-app", {},
        d(Header,
          {
            ui: this.props.ui,
            routing: this.props.routing
          }),
        this.props.children);
  }
});

const Wrapper = React.createClass({

  render() {

    return d(
        Router, { history: createBrowserHistory() },
        d(Route, { path: "/", component: connect((s) => s)(App) },
          d(IndexRoute, { component: AddSymptom })));
  }
});

ReactDOM.render(
    d(Provider, { store: store },
      d(Wrapper, {})), 
    document.querySelector("[data-app]"));
