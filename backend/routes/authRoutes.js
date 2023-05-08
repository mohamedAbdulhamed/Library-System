const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
dotenv.config({path: './.env'});

SALT_ROUNDS = 10;

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

db.connect((err) => {
  if (err) throw err;
  console.log("authRoutes Connected to Database!");
});

// 401 Unauthorized HTTP status code
router.get('/verify', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({msg: "Authentication token not found!", loggedIn: false, devErr: "Token not found!"});
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({err: "Verifing problem, try again later! ", devErr: err});
    res.status(200).json({user: user, loggedIn: true});
  });
});

router.post('/login', (req, res) => {
  sql = "SELECT * FROM users WHERE email = ?";
  if (req.body.email && req.body.password) {
    db.query(sql, req.body.email, (err, result) => {
      if (err) return res.status(400).json({err: "Error ocured", devErr: err});
      if (result.length > 0) {
        bycrypt.compare(req.body.password, result[0].password, (err, response) => {
          if (err) return res.status(400).json({err: "Error ocured", devErr: err});
          if (response) {
            const user = result[0];
            const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
            res.cookie('token', token);

            // Make user online
            db.query('Update users SET status = ? WHERE id = ?', [1, result[0].id], (err, result) => {
              if (err) return res.status(400).json({err: "Error ocured!", devErr: err});
              return res.status(200).send();
            });
          } else {
            return res.status(400).json({err: 'Incorrect Username and/or Password!'});
          }
        });
      } else {
        return res.status(400).json({err: 'User does not exist!'});
      }
    });
  } else {
    res.json('Please enter Username and Password!');
  }
});

router.post('/register', (req, res) => {
  // Check if user already exists
  db.query("SELECT * FROM users WHERE email = ?", req.body.email, (err, result) => {
    if (err) return res.json({msg: "Error: " + err});
    if (result.length > 0) return res.json({msg: "User already exists!"});
  });
  sql = "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)";
  bycrypt.hash(req.body.password, SALT_ROUNDS, (err, hash) => {
    if (err) return res.json({msg: "Error occured while registering user!", err: err});
    const values = [req.body.name, req.body.email, req.body.phone, hash];
    db.query(sql, values, (err, results) => {
      if (err) return res.json({msg: "Error occured while registering user!", err: err});
      const user = {id: results.insertId, name: req.body.name, email: req.body.email, phone: req.body.phone};
      const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
      res.cookie('token', token);
      return res.json({Status: "Success"});
    });
  });
});

router.get('/logout', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(404).json({msg: "Token not found!"});
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(500).json({msg: "Error: " + err});
    // Make user offline
    db.query('Update users SET status = ? WHERE id = ?', [0, user.user.id], (err, result) => {
      if (err) return res.status(500).json({msg: "Error: " + err});
      res.clearCookie('token');
      return res.status(200).json({Status: "Success"});
    });
  });
});



module.exports = router;