const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stuff = new Schema({
  name: {
    type: String,
    required: true
  },
  description: { type: String },
  picture: { type: String },
  status: {
    type: Boolean,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  condition: {
    type: String,
    enum: ['New', 'Former'],
    required: true
  },
  address: { type: String },
  is_cod: { type: Boolean },
  postal_fee: { type: String },
  owner_id: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamps: true
});

module.exports = mongoose.model('Stuff', Stuff);