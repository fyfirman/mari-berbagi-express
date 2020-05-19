const mongoose = require("mongoose");
const requestSchema = require("./request.model");

requestSchema.statics = {
  create: function (data, cb) {
    let request = new this(data);
    request.save(cb);
  },

  get: function (query, cb) {
    this.find(query, cb);
  },

  update: function (query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function (query, cb) {
    this.findOneAndDelete(query, cb);
  },
};

const requestModel = mongoose.model("Request", requestSchema);
module.exports = requestModel;
