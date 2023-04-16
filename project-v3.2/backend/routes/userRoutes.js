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
  console.log("userRoutes Connected to Database!");
});

router.get('/get-users', (req, res) => {
  const sql = 'SELECT * FROM users WHERE type = 1';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) return res.json(data);
    else return res.json({msg: "No Record Found!"});
  });
});

router.get('/get-user/:id', (req, res) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [req.params.id], (err, data) => {
    if (err) return res.json({data: "Error Occured!"});
    if (data.length > 0) return res.json(data);
    else return res.json({data: "No Record Found!"});
  });
});

router.post('/add-user', (req, res) => {
  if (req.body.name == '' || req.body.email == '' || req.body.password == '') {
    return res.status(400).json({ msg: 'Empty Parameters' });
  }
  const sql = "INSERT INTO users (`name`,`email`,`password`, `phone`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password, req.body.phone];
  db.query(sql, [values] , (err, data) => {
    if (err) return res.json({msg: "Error Occured!"});
    return res.status(200).json({msg: "User Added Successfully!"});
  });
});

router.put('/update-user/:id', (req, res) => {
  if (req.body.name == '' || req.body.email == '' || req.body.password == '') {
    return res.status(400).json({ msg: 'Empty Parameters' });
  }
  const sql = "UPDATE users SET `name` = ?, `email` = ?, `password` = ?, `phone` = ? WHERE id = ?";
  const values = [req.body.name, req.body.email, req.body.password, req.body.phone, req.params.id];
  db.query(sql, values , (err, data) => {
    if (err) return res.json("Error Occured!");
    return res.status(200).json("Book Updated Successfully!");
  });
});

router.delete('/delete-user/:id', (req, res) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [req.params.id], (err, data) => {
    if (err) return res.json({msg: "Error Occured!"});
    if (data.affectedRows > 0) return res.json({msg: "User Deleted Successfully!"});
    else return res.json({msg: "No Record Found!"});
  });
});



module.exports = router;