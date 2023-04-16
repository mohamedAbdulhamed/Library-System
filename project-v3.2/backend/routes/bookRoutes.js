const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');

const router = express.Router();
dotenv.config({path: './.env'});

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

db.connect((err) => {
  if (err) throw err;
  console.log("bookRoutes Connected to Database!");
});

router.get('/get-books', (req, res) => {
  const sql = 'SELECT * FROM books';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) return res.json(data);
    else return res.json(" No Record Found ");
  });
});

router.get('/get-book/:id', (req, res) => {
  const sql = 'SELECT * FROM books WHERE id = ?';
  const values = [req.params.id];
  db.query(sql, [values] , (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) return res.status(200).json(data);
    else return res.json(" No Record Found ");
  });
});

// Don't forget to add admin check/validation here

router.post('/add-book', (req, res) => {
  if (req.body.name == '' || req.body.description == '' || req.body.author == '' || req.body.field == '' || req.body.dop == '' || req.body.pdf == '') {
    return res.status(400).json({ msg: 'Empty Parameters' });
  }
  // This note is just for me to remember that I need to add a check here to see if the book already exists in the database
  const sql = "INSERT INTO books (`name`,`description`,`author`,`field`,`dop`,`pdf`) VALUES (?)";
  const values = [req.body.name, req.body.description, req.body.author, req.body.field, req.body.dop, req.body.pdf];
  db.query(sql, [values] , (err, data) => {
    if (err) return res.json({msg: err});
    return res.status(200).json({msg: "Book Added Successfully!"});
  });
});

router.post('/update-book/:id', (req, res) => {
  if (req.body.name == '' || req.body.description == '' || req.body.author == '' || req.body.field == '' || req.body.dop == '' || req.body.pdf == '') {
    return res.status(400).json({ msg: 'Empty Parameters' });
  }
  const sql = "UPDATE books SET `name` = ?, `description` = ?, `author` = ?, `field` = ?, `dop` = ?, `pdf` = ? WHERE id = ?";
  const values = [req.body.name, req.body.description, req.body.author, req.body.field, req.body.dop, req.body.pdf, req.params.id];
  db.query(sql, values , (err, data) => {
    if (err) return res.json({msg: err});
    return res.status(200).json({msg: "Book Updated Successfully!"});
  });
});

router.delete('/delete-book/:id', (req, res) => {
  const sql = "DELETE FROM books WHERE id = ?";
  const values = [req.params.id];
  db.query(sql, [values] , (err, data) => {
    if (err) return res.json({msg: "Error Occured!"});
    return res.status(200).json({msg: "Book Deleted Successfully!"});
  });
});

module.exports = router;