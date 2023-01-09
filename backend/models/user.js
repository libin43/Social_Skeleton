 const mongoose = require('mongoose');

 const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true},
    password: { type: String, required: true},
    image: {type:String}
 },
 { collection: 'USER-DATA' }
 )

 const model = mongoose.model('UserData', userSchema);
 module.exports = model;
