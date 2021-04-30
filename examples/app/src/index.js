import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, lightTheme } from "@strapi/design-system";
import "./index.css";
import Main from "./App";
import reportWebVitals from "./reportWebVitals";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Main />
    </ThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
