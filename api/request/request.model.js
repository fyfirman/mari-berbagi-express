const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Request = new Schema({
  _id: { type: String },
  name: { type: String },
  reason: { type: String },
  amount: { type: String },
  address: { type: String },
  is_cod: { type: Boolean },
  postal_fee: { type: Boolean },
  status: {
    type: String,
    enum: ['Paid', 'Not yet paid', 'Waiting', 'Rejected']
  },
  requestor_id: { type: Schema.Types.ObjectId, ref: 'User' },
  stuff_id: { type: Schema.Types.ObjectId, ref: 'Stuff' },
  timestamps: true
});

module.exports = mongoose.model('Request', Request);