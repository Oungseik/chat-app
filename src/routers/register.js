//@ts-check
const { Router } = require("express");
const { getViews } = require("../lib/utils");
const { BadRequestError } = require("../lib/errors");

const router = Router();

const registerFile = getViews("register", "index.html");

router.get("/", (_request, response) => {
  response.sendFile(registerFile);
});

router.post("/", (request, response) => {
  const { username, email, password, passwordConfirm } = request.body;

  if (password !== passwordConfirm) {
    return response.status(400).sendFile(registerFile);
  }
  console.log(username, email, password, passwordConfirm);
  response.redirect("/login");
});

module.exports = router;
