import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@strapi/design-system/ThemeProvider";
import { lightTheme } from "@strapi/design-system/themes";
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
