const User = require("./user.dao");
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.createUser = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  if (
    req.body.username &&
    req.body.password &&
    req.body.passwordConf &&
    req.body.profile.name &&
    req.body.profile.address &&
    req.body.profile.phone &&
    req.body.profile.email
  ) {
    let user = {
      username: req.body.username,
      password: req.body.password,
      profile: {
        name: req.body.profile.name,
        address: req.body.profile.address,
        phone: req.body.profile.phone,
        email: req.body.profile.email,
        profile_picture: req.body.profile.profile_picture
      },
    };

    User.create(user, (err, user) => {
      if (!err) {
        res.json({
          message: `User with ${user.username} created successfully`,
        });
      } else {
        res.status(400).json({
          error: err,
        });
      }
    });
  }
  else {
    res.status(400).json({
      error:{
        status: 400,
        message: `Required field is not set`,
      }
    });
  }
};

exports.getUsers = (req, res, next) => {
  User.get({}, (err, users) => {
    if (!err) {
      res.json({
        User: users,
      });
    } else {
      res.status(400).json({
        error: err,
      });
    }
  });
};

exports.getUser = (req, res, next) => {
  User.get({ _id: req.params.id }, (err, user) => {
    if (!err) {
      res.json({
        User: user,
      });
    } else {
      res.status(400).json({
        error: err,
      });
    }
  });
};

exports.updateUser = (req, res, next) => {
  let user = {
    name: req.body.name,
    description: req.body.description,
  };
  User.update({ _id: req.params.id }, user, (err, user) => {
    if (err) {
      res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "User updated successfully",
    });
  });
};

exports.removeUser = function (req, res, next) {
  User.delete({ _id: req.params.id }, function (err, user) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: "User deleted successfully",
    });
  });
};

exports.authenticate = function (req, res, next) {
  User.getOne({ username: req.body.username }, function (err, user) {
    if (err || !user) {
      let err = new Error('Wrong email or password');
      res.status(401).json({
        error: err,
      });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result === true) {
          req.session.userId = user._id;
          res.json({
            message: `${user.username} successfully logged in`,
          });
        } else {
          let err = new Error('Wrong email or password');
          res.status(401).json({
            error: err,
          });
        }
      });
    }
  });
}