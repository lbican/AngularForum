const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const config = require('./config');
const app = express();

const pool = mysql.createPool(config.pool).promise();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'dist/angular-forum')))

const apiRouter = require('./app/routes/api')(express, pool);
app.use('/api', apiRouter);

app.use('/*', function (req, res){
  res.sendFile(path.join(__dirname, 'dist/angular-forum/index.html'));
})
app.get('*', function(req, res) {
  res.json({ message: 'Backend is UP, open Frontend application to use it.' });
});

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
});
