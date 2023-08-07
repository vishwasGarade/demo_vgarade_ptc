const fs = require('fs');
var flag=0;

exports.getHomePage = (req, res) => {
    let query = "SELECT * FROM `players` ORDER BY id ASC"; // query database to get all the players
    
    db.connect((err) => {
        if (err) {
            // throw err;
            console.log(err);
            res.send("Error occured during database connection!");
            flag=0;
            return;
        }
        flag=1;
        console.log('Connected to database');
    });
    setTimeout(()=>{
        console.log(flag);
        if(flag){
            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    // res.send(err);
                    res.redirect('/');
                }
                
                res.render('index.ejs', {
                    title: "Welcome to Socka | View Players",
                    players: result
                });
            });
            db.end();
        }
        
    },2000)
};
