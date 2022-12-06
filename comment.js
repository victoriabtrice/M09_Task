const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');

// parse application/json
app.use(bodyParser.json());

// create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_db'
});

// connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

// show newest 5 comment data
app.get('/api/comments', (req, res) => {
    let sql = "SELECT * FROM comment ORDER BY comment_created DESC LIMIT 5";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// show comment by comment id
app.get('/api/comment/:id', (req, res) => {
    let sql = "SELECT * FROM comment WHERE comment_id ="+ req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// show comments by customer id
app.get('/api/comments/customer/:id', (req, res) => {
    let sql = "SELECT * FROM comment WHERE cust_id ="+ req.params.id +" ORDER BY comment_created DESC";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// make new comment 
app.post('/api/comment', (req, res) => {
    let data = {cust_id: req.body.cust_id, product_id: req.body.product_id, comment_text: req.body.comment_text};
    let sql = "INSERT INTO comment SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": 'SUCCESS'}));
    });
});

// delete comment by comment id
app.delete('/api/comment/:id', (req, res) => {
    let sql = "DELETE FROM comment WHERE comment_id ="+ req.params.id+"";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": 'DELETED'}));
    });
});

// server listening
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});