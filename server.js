const fs = require('fs');
const express = require("express");
const bodyParse = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended : true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : conf.host,
  user : conf.user,
  password : conf.password,
  port : conf.port,
  database : conf.database
});

connection.connect();

const multer = require('multer');
const upload = multer({dest : './upload'});

app.get('/api/customers', (req, res) => {
  connection.query(
    // isDeleted가 0인 것만 가져옴
    "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.use('/image', express.static('./upload')); //사용자는 image 폴더로 확인하고 실제 매핑은 ./upload

app.post('/api/customers', upload.single('image'), function(req, res) {
  let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)";
  let image = '/image/' + req.file.filename;
  let name = req.body.userName;
  let birth = req.body.birth;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birth, gender, job];
  
  connection.query(sql, params, function(err, rows, fields) {
    res.send(rows);
  });
});

app.delete('/api/customer/:id', function(req, res) {
  let sql = "UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, function(err, rows, fields) {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
