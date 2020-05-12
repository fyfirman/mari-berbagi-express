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
      picture: req.body.picture,
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