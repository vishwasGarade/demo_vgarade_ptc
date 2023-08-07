const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
require('dotenv').config();
const http = require('http');



const app = express();
 
const playerRoutes = require('./routes/player.routes');
const homeRoutes = require('./routes/index.routes');
const port = process.env.PORT || 8080;   


// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: process.env.HOST || '127.0.0.1',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || 'vishwas',
    database: process.env.DATABASE || 'hybrid_con'
});

// // connect to database
// db.connect((err) => {
//     // if (err) {
//     //     throw err;
//     // }
//     console.log('Connected to database');
// });
global.db = db;

// configure middleware
app.set('port', process.env.port || 8080); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// const baseUrl = "https://hybrid-app-test-6.azurewebsites.net/";

// routes for the app
app.use(`/`, homeRoutes);
app.use(`/player`, playerRoutes);

// app.get('/',(req,res)=>{
//     // connect to database
// db.connect((err) => {
//     if (err) {
//         // throw err;
//         console.log(err)
//     }
//     console.log('Connected to database');
// });
// db.end();
// global.db = db;
// res.send('hello world')
// })

app.get('*', function(req, res, next){
    res.status(404);

    res.render('404.ejs', {
        title: "Page Not Found",
    });

});




// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
