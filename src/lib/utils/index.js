const path = require("path");

const getViews = (...paths) => path.join(process.cwd(), "src", "view", ...paths);

module.exports = {
  getViews,
};
