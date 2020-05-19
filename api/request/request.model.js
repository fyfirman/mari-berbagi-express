const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Request = new Schema({
  _id: { type: String },
  reason: { type: String },
  amount: { type: Number },
  address: { type: String },
  is_cod: { type: Boolean },
  postal_fee: { type: Number },
  status: {
    type: String,
    enum: ['Paid', 'Not yet paid', 'Waiting', 'Rejected']
  },
  requestor_id: { type: Schema.Types.ObjectId, ref: 'User' },
  stuff_id: { type: Schema.Types.ObjectId, ref: 'Stuff' },
},
  { timestamps: true }
);

module.exports = mongoose.model('Request', Request);