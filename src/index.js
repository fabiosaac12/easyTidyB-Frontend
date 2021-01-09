import React from "react";
import ReactDOM from "react-dom";
import workspaceStore from "./store/workspaceStore";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "./styles/main.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <Router>
    <Provider store={workspaceStore}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
