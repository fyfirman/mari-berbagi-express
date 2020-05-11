const User = require("./user.controller");
const { validate } = require("./user.validation");

const routes = "/user";

module.exports = (router) => {
  router.get(routes + "/", User.getUsers);
  router.get(routes + "/:id", User.getUser);
  router.put(routes + "/:id", User.updateUser);
  router.delete(routes + "/:id", User.removeUser);
  
  router.post("/register", validate('createUser'), User.createUser);
  router.post("/login", User.authenticate)
};
