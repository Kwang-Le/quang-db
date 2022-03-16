const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


app.listen(3000, function(){
    console.log('Node listening at http://localhost:3000 ...');
});

var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "quang",
    password: "tommyguns123",
    database:"users"
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!!!");
    var sql = "SELECT * from task";
    con.query(sql, (err, results) =>{
        if (err) throw err;
        console.log(results);
    })
  });

  app.get('/', function (req, res) {
    con.query('SELECT * FROM task', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

  app.get('/:id', (req, res) => {
      let user_id = req.params.id;
      con.query(`SELECT * FROM task WHERE id=?`,user_id, (err, results) =>{
          if(err) throw err;
          res.send(results);
      });
  })

  