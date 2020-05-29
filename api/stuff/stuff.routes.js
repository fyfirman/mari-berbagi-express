const Stuff = require("./stuff.controller");
const upload = require("./stuff.upload")
// const { validate } = require("./stuff.validation");

const routes = "/stuff";

module.exports = (router) => {
  router.post(routes + "/", upload.single('picture'), Stuff.createStuff);
  router.get(routes + "/", Stuff.getStuffs);
  router.get(routes + "/:id", Stuff.getStuff);
  router.put(routes + "/:id", Stuff.updateStuff);
};
