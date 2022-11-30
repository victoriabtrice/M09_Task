const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');

app.use(bodyParser.json());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_db'
});

conn.connect((err) => {
    if(err) throw err;
    console.log('Mysql Connected...');
});

app.get('/api/products', (req, res) => {
    let sql = 'SELECT * FROM product';
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({'status': 200, 'error': null, 'response': results}));
    });
});

app.get('/api/products/:id', (req, res) => {
    let sql = 'SELECT * FROM product WHERE product_id =' + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({'status': 200, 'error': null, 'response': results}));
    });
});

app.post('/api/products', (req, res) => {
    let data = {product_name: req.body.product_name, product_price: req.body.product-price};
    let sql = 'INSERT INTO product SET ?';
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({'status': 200, 'error': null, 'response': 'Insert data successfully'}));
    });
});

app.put('/api/products/:id', (req, res) => {
    let sql = "UPDATE product SET product_name = '"+req.body.product_name+"', product_price = '"+req.body.product_price+ "'WHERE product_id ="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({'status': 200, 'error': null, 'response': 'Update data successfully'}));
    });
});

app.delete('/api/products/:id', (req, res) => {
    let sql = 'DELETE FROM product WHERE product_id ='+ req.params.id+"";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({'status': 200, 'error': null, 'response': 'Delete data successfully'}));
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000...');
});