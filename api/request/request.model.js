const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  reason: { type: String },
  amount: { type: Number },
  address: { type: String },
  is_cod: { type: Boolean },
  postal_fee: { type: Number },
  status: {
    type: String,
    enum: ['done','sent','paid', 'not yet paid', 'waiting', 'rejected']
  },
  requestor_id: { type: Schema.Types.ObjectId, ref: 'User' },
  stuff_id: { type: Schema.Types.ObjectId, ref: 'Stuff' },
},
  { timestamps: true }
);

module.exports = RequestSchema;