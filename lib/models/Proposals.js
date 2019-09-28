const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const { Schema } = mongoose;

const proposalsSchema = new Schema({
  link: { type: String, required: true },
  description: { type: String, required: true },
  id: { type: Number, unique: true, required: true },
  issuer: { type: String, required: true },
  txHash: { type: String },
});

mongoose.model('proposals', proposalsSchema);
