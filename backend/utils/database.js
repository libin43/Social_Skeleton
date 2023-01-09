const mongoose = require('mongoose');

mongoose.set('strictQuery',true);
mongoose.connect('mongodb://localhost:27017/Webapp',(err)=>{
    err ? console.log(`db error${err}`) :console.log('db connected')
});