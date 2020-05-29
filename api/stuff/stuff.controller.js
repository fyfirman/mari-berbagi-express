const Stuff = require("./stuff.dao");
const { validationResult } = require('express-validator');

exports.createStuff = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 422,
      errors: errors.array()
    })
  } else {
    let stuff = {
      name: req.body.name,
      description: req.body.description,
      picture: req.file.path,
      status: req.body.status,
      amount: req.body.amount,
      condition: req.body.condition,
      address: req.body.address,
      is_cod: req.body.is_cod,
      postal_fee: req.body.postal_fee,
      owner_id: req.body.owner_id
    }

    Stuff.create(stuff, (err, stuff) => {
      if (!err) {
        res.json({
          status: 200,
          message: `Stuff with ${stuff.name} created successfully`,
          stuff: stuff
        });
      } else {
        res.status(400).json({
          status: 400,
          error: err,
        });
      }
    })
  }
}

exports.getStuffs = (req, res, next) => {
  if (!req.query.owner_id) {
    Stuff.get({}, (err, stuffs) => {
      if (!err) {
        res.json({
          status: 200,
          Stuff: stuffs,
        });
      } else {
        res.status(400).json({
          status: 400,
          error: err,
        });
      }
    });
  } else {
    Stuff.get({ owner_id: req.query.owner_id }, (err, stuffs) => {
      if (!err) {
        res.json({
          status: 200,
          Stuff: stuffs,
        });
      } else {
        res.status(400).json({
          status: 400,
          error: err,
        });
      }
    });
  }
};

exports.getStuff = (req, res, next) => {
  Stuff.get({ _id: req.params.id }, (err, stuff) => {
    if (!err) {
      res.json({
        Stuff: stuff,
      });
    } else {
      res.status(400).json({
        error: err,
      });
    }
  });
}

exports.updateStuff = (req, res, next) => {
  let stuff = {
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    amount: req.body.amount,
    condition: req.body.condition,
    address: req.body.address,
    is_cod: req.body.is_cod,
    postal_fee: req.body.postal_fee,
    owner_id: req.body.owner_id
  }

  Stuff.update({ _id: req.params.id }, stuff, (err, stuff) => {
    if (!err) {
      res.json({
        status: 200,
        message: 'Stuff successfully updated',
        Stuff: stuff,
      });
    } else {
      res.status(400).json({
        error: err,
      });
    }
  })
}