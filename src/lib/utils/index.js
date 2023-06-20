const path = require("path");

const getView = (...paths) => path.join(process.cwd(), "src", "view", ...paths, "index.html");

module.exports = {
  getView,
};
