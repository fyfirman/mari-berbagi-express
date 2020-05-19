const Stuff = require("./stuff.controller");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
// const { validate } = require("./stuff.validation");

const routes = "/stuff";

module.exports = (router) => {
  router.post(routes + "/", upload.single('picture'), Stuff.createStuff);
  router.get(routes + "/", Stuff.getStuffs);
};
