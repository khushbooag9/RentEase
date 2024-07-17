const mongoose = require("mongoose");
const {Schema}= mongoose;
const tenantSchema = new Schema({
    name: String,
    email: {type:String, unique:true},
    password: String,
    address: String,
    phone_no: Number,
    }, {collection: 'Tenant'});

const Register = new mongoose.model("Tenant", tenantSchema);

module.exports = Register;