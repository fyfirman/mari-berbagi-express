const Request = require("./request.dao");
const { validationResult } = require('express-validator');

exports.createRequest = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 422,
      errors: errors.array()
    })
  } else {
    let request = {
      reason: req.body.reason,
      amount: req.body.amount,
      address: req.body.address,
      is_cod: req.body.is_cod,
      postal_fee: req.body.postal_fee,
      status: "waiting",
      requestor_id: req.body.requestor_id,
      stuff_id: req.body.stuff_id
    }

    Request.create(request, (err, request) => {
      if (!err) {
        res.json({
          status: 200,
          message: `Request created successfully`,
          request: request
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

exports.getRequests = (req, res, next) => {
  if (!req.query.requestor_id) {
    Request.get({}, (err, requests) => {
      if (!err) {
        res.json({
          status: 200,
          Request: requests,
        });
      } else {
        res.json({
          status: 400,
          error: err,
        });
      }
    });
  } else {
    Request.get({
      requestor_id: req.query.requestor_id
    }, (err, requests) => {
      if (!err) {
        res.json({
          status: 200,
          Request: requests,
        });
      } else {
        res.json({
          status: 400,
          error: err,
        });
      }
    });
  }
};