const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StuffSchema = new Schema({
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
    enum: ['new', 'former'],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  is_cod: {
    type: Boolean,
    required: true
  },
  postal_fee: {
    type: Boolean,
    required: true
  },
  owner_id: { type: Schema.Types.ObjectId, ref: 'User' }
},
  { timestamps: true }
);

module.exports = StuffSchema;