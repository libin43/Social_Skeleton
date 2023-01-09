const express =require('express');
const app=express();
const cors = require('cors')
require('./utils/database');

app.use(cors());
app.use(express.json());
app.use(express.static( 'public'));


const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');




//routes
app.use('/api',userRoutes);

app.listen(7000); 