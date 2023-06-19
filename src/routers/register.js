//@ts-check
const { Router } = require("express");
const { getViews } = require("../lib/utils");

const router = Router();

router.get("/", (_request, response) => {
  response.sendFile(getViews("register", "index.html"));
});

module.exports = router;
