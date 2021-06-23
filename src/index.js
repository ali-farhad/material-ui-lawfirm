import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import FirebaseContext from "./context/firebase";
import { firebase, FieldValue, googleProvider } from "./libs/firebase";

//imports for notification
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 4000,
  position: positions.TOP_RIGHT,
  containerStyle: {
    zIndex: 100000,
  },
};

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue, googleProvider }}>
    <Provider template={AlertTemplate} {...options}>
      <App />
    </Provider>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
