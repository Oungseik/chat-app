// @ts-check
require("dotenv").config();
const { log } = require("./logger");

const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  log("Server is running on PORT", PORT);
});
