const mongoose = require('mongoose');

const LandlordSchema = new mongoose.Schema({
    name: String,
    email: {type:String, unique:true},
    password: String,
    address: String,
    phone_no: Number,
    }, {collection: 'Landlord'}
);


module.exports = mongoose.model('Landlord', LandlordSchema);