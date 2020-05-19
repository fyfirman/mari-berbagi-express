const Request = require("./request.controller");
// const { validate } = require("./request.validation");

const routes = "/request";

module.exports = (router) => {
  router.post(routes + "/", Request.createRequest);
  router.get(routes + "/", Request.getRequests);
};
