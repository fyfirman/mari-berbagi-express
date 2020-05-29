const mongoose = require("mongoose");
const stuffSchema = require("./stuff.model");

stuffSchema.statics = {
  create: function (data, cb) {
    let stuff = new this(data);
    stuff.save(cb);
  },

  get: function (query, cb) {
    this.find(query, cb);
  },

  update: function (query, updateData, cb) {
    this.findOneAndUpdate(query, updateData, { new: true }, cb);
  },

  delete: function (query, cb) {
    this.findOneAndDelete(query, cb);
  },
};

const stuffModel = mongoose.model("Stuff", stuffSchema);
module.exports = stuffModel;
