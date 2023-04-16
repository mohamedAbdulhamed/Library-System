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
  console.log("requestRoutes Connected to Database!");
});

router.get('/get-requests', (req, res) => {
  const sql = 'SELECT * FROM requests';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) return res.json(data);
    else return res.json("No Requests Found!");
  });
});

router.get('/get-request/:id', (req, res) => {
  const sql = 'SELECT * FROM requests WHERE id = ?';
  const id = req.params.id;
  db.query(sql, values , (err, data) => {
    if (err) return res.json("Error Occured!");
    if (data.length > 0) return res.status(200).json(data);
    else return res.json("Cannot Find Request!");
  });
});

router.post('/create-request', (req, res) => {
  const sql = 'INSERT INTO requests (`user_id`,`book_id`) VALUES (?)';
  const values = [req.body.user_id, req.body.book_id]
  db.query(sql, [values] , (err, data) => {
    if (err) return res.json("Error Occured!");
    return res.status(200).json("Request Created!");
  });
});


router.post('/accept-request/:id', (req, res) => {
  const sql = 'UPDATE requests SET status = 1 WHERE id = ?';
  const id = req.params.id;
  // check if request is already accepted/ exists
  db.query(sql, id, (err, data) => {
    if (err) return res.json({msg: "Error Occured!"});
    else return res.json({msg: "Request Accepted!"});
  });
});

router.post('/reject-request/:id', (req, res) => {
  const sql = 'UPDATE requests SET status = -1 WHERE id = ?';
  const id = req.params.id;
  // check if request is already rejected/ exists
  db.query(sql, id, (err, data) => {
    if (err) return res.json({msg: "Error Occured!"});
    else return res.json({msg: "Request Rejected!"});
  });
});


router.get('get-user-requests/:id', (req, res) => {
  const sql = 'SELECT * FROM requests WHERE user_id = ?';
  const id = req.params.id;
  db.query(sql, id, (err, data) => {
    if (err) return res.json("Error Occured!");
    if (data.length > 0) return res.status(200).json(data);
    else return res.json("User Has No Requests!");
  });
});



module.exports = router;