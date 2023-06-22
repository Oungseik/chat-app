const { Router } = require("express");
const { getView } = require("../lib/utils");

const User = require("../models/User");

const chatView = getView("");

const router = Router();

router.get("/", async (request, response) => {
  response.sendFile(chatView);
});

module.exports = router;
