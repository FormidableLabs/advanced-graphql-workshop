import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { GlobalStyles } from "./layout/GlobalStyles";
import { Client } from "./lib/Client";
import { Context } from "./lib/Context";

const client = new Client("https://threed-test-api.herokuapp.com/graphql");

ReactDOM.render(
  <Context.Provider value={client}>
    <GlobalStyles />
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
