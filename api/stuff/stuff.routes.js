const Stuff = require("./stuff.controller");
// const { validate } = require("./stuff.validation");

const routes = "/stuff";

module.exports = (router) => {
  router.post(routes + "/", Stuff.createStuff);
};
