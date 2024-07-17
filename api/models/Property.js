const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price:{
    type: Number,
    required: true
  },
  amenities:{
    type: String,
    required: true,
  },
  resources:{
    type: String,
    required: true,
  },
  area:{
    type: Number,
    required: true
  },
  landl_name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date_added: {
    type: Date,
    required: true,
    default: Date.now,
  },
  featured: {
    type: Boolean,
    required: true,
    default: false,
  }
},{collection: 'Property'});

module.exports = mongoose.model('Property', PropertySchema);