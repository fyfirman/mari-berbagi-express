const Request = require("./request.controller");
const upload = require("./request.upload")
// const { validate } = require("./request.validation");

const routes = "/request";

module.exports = (router) => {
  router.post(routes + "/", upload.single('picture'), request.createRequest);
  router.get(routes + "/", Request.getRequests);
};
