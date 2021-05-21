import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, lightTheme } from "@strapi/design-system";
import Main from "./App";

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
