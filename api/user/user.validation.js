const { body } = require('express-validator');
const User = require('./user.dao')

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
      return [
        body('username')
          .custom(value => {
            if (isUsernameExist(value)) {
              return Promise.reject('Username already in use');
            }
            return true
          })
          .isLength({ min: 4 })
          .withMessage('Must be at least 4 chars long')
        ,
        body('password')
          .isLength({ min: 8 })
          .withMessage('Must be at least 8 chars long')
      ]
    }
  }
}

isUsernameExist = (username) => {
  User.get({ username: username }, (err, user) => {
    if (!err) {
      return true;
    } else {
      return false;
    }
  });
}