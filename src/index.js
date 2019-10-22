import React from "react";
import ReactDOM from "react-dom";

// import { createClient, Provider } from "./lib";

import App from "./App";
import { GlobalStyles } from "./layout/GlobalStyles";

// const client = createClient({
//   url: "https://threed-test-api.herokuapp.com/graphql"
// });

ReactDOM.render(
  // <Provider client={client} />
  <>
    <GlobalStyles />
    <App />
  </>,
  // </Provider>
  document.getElementById("root")
);
