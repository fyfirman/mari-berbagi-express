const mongoose = require("mongoose");
const userSchema = require("./user.model");

userSchema.statics = {
  create: function (data, cb) {
    var user = new this(data);
    user.save(cb);
  },

  get: function (query, cb) {
    this.find(query, cb);
  },

  getOne: function (query, cb) {
    return this.findOne(query, cb);
  },

  update: function (query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function (query, cb) {
    this.findOneAndDelete(query, cb);
  },
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
