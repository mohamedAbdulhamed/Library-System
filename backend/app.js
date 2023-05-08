const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
dotenv.config({path: './.env'});

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const session = require('express-session');

// Routes
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const chapterRoutes = require('./routes/chapterRoutes');
const requestRoutes = require('./routes/requestRoutes');

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log("running on port " + PORT);
});


const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

db.connect((err) => {
  if (err) throw err;
  console.log("App Connected to Database");
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Server is running
app.get('/', (req, res) => {
  res.status(200).send("Hello World");
});
// simple endpoints for postman
app.get('/items', (req, res) => {
  res.send('you requested all items');
});
app.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  res.send(`you requested item ${itemId}`);
});
app.post('/items', (req, res) => {
  const itemId = req.body.id;
  res.send(`item ${itemId} has been added`);
});
app.put('/items/:id', (req, res) => {
  const itemId = req.params.id;
  res.send(`item ${itemId} has been updated`);
});
app.put('/items', (req, res) => {
  const itemId = req.body.id;
  res.send(`item ${itemId} has been updated`);
});
app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  res.send(`item ${itemId} has been deleted`);
});

// Routes
app.use(authRoutes);
app.use(bookRoutes);
app.use(userRoutes);
app.use(chapterRoutes);
app.use(requestRoutes);


// 404 page
app.use((req, res) => {
  res.status(404).json("404 API Not Found");
});