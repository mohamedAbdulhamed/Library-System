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
  console.log("chapterRoutes Connected to Database!");
});

router.get('/get-chapters', (req, res) => {
  const sql = 'SELECT * FROM chapters';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) return res.json(data);
    else return res.json({msg: "No Chapters Found!"});
  });
});

router.get('/get-chapter/:id', (req, res) => {
  const sql = 'SELECT * FROM chapters WHERE id = ?';
  const values = [req.params.id];
  db.query(sql, [values] , (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) return res.status(200).json(data);
    else return res.json(" No Record Found ");
  });
});

router.post('/add-chapter', (req, res) => {
  const sql = "INSERT INTO chapters (`title`,`description`,`book_id`) VALUES (?)";
  const values = [req.body.title, req.body.description, req.body.book_id];
  // This note is just for me to remember that I need to add a check here to see if the chapter already exists in the database
  db.query(sql, [values] , (err, data) => {
    if (err) return res.json({msg: err});
    return res.status(200).json({msg: "Chapter Added Successfully!"});
  });
});

router.post('/update-chapter/:id', (req, res) => {
  const sql = "UPDATE chapters SET `title` = ?, `description` = ? WHERE id = ?";
  const values = [req.body.title, req.body.description, req.params.id];
  db.query(sql, values , (err, data) => {
    if (err) return res.json({msg: "Error Occured!"});
    return res.status(200).json({msg: "Chapter Updated Successfully!"});
  });
});

router.delete('/delete-chapter/:id', (req, res) => {
  const sql = "DELETE FROM chapters WHERE id = ?";
  const values = [req.params.id];
  db.query(sql, [values] , (err, data) => {
    if (err) return res.json({msg: "Error Occured!"});
    return res.status(200).json({msg: "Chapter Deleted Successfully!"});
  });
});

module.exports = router;