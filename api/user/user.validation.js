const { body } = require('express-validator');
const User = require('./user.dao')

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
      return [
        body('username')
          .custom(username => {
            return User.getOne({ username: username }).then(user => {
              if (user) {
                return Promise.reject(`${user.username} already in use`);
              }
            })
          })
          .isLength({ min: 4 })
          .withMessage('Must be at least 4 chars long')
        ,
        body('password')
          .isLength({ min: 8 })
          .withMessage('Must be at least 8 chars long'),
        body('passwordConf')
          .custom((passwordConf, { req }) => {
            if (passwordConf !== req.body.password) {
              throw new Error('Password confirmation does not match password');
            }
            return true;
          })
      ]
    }
  }
}