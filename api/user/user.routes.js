const User = require("./user.controller");
const { validate } = require("./user.validation");

const routes = "/user";

module.exports = (router) => {
  router.get(routes + "/", User.getUsers);
  router.get(routes + "/:id", User.getUser);
  router.post(routes + "/", validate('createUser'), User.createUser);
  router.put(routes + "/:id", User.updateUser);
  router.delete(routes + "/:id", User.removeUser);

  router.post("/login", User.authenticate)
};
