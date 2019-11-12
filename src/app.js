const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');



const app = express();

//IMPORTING ROUTES
const costumerRoutes = require('./routes/customer');


// SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARES
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'dbregistros',
}, 'single'));
app.use(express.urlencoded({extended: false}));

//ROUTES
app.use('/', costumerRoutes);

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//STARTING THE SERVER
app.listen(app.get('port'), () => {
    console.log("Server on port 3000");
});


