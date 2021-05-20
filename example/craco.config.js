const path = require("path");

const alias = {
  react: path.resolve(__dirname, "node_modules", "react"),
  "react-dom": path.resolve(__dirname, "node_modules", "react-dom"),
  "react/jsx-dev-runtime": path.resolve(__dirname, "node_modules", "react/jsx-dev-runtime"),
  "react/jsx-runtime": path.resolve(__dirname, "node_modules", "react/jsx-runtime"),
};

module.exports = {
  webpack: {
    configure: (wConfig) => {
      wConfig.resolve.alias = { ...wConfig.resolve.alias, ...alias };

      return wConfig;
    },
  },
};
