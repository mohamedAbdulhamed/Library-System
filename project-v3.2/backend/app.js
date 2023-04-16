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
// app.use(session({
//   secret: "noobmaster",
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false,
//     expires: 1000 * 60 * 60 * 24,
//   },
// }));

app.listen(7000, () => {
  console.log("running on port 7000");
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

app.set('view engine', 'ejs');
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));


// Routes
app.use(authRoutes);
app.use(bookRoutes);
app.use(userRoutes);
app.use(chapterRoutes);
app.use(requestRoutes);


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});


app.get('/', (req, res) => {
  // redirect to login page if not logged in
  // else redirect to dashboard
  if (req.session.loggedin) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

// Authintication / Start
app.post('/login', (req, res) => {
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  const values = [req.body.email, req.body.password];
  db.query(sql, [values] , (err, data) => {
    if (err) return res.json(" Error ");
    if (data.length > 0) return res.json(data);
    else return res.json(" No Record Found ");
  });
});

app.post('/register', (req, res) => {
  const sql = '';
  const values = [req.body.email, req.body.password];
  db.query(sql, [values] , (err, data) => {
    if (err) return res.json(" Error ");
    if (data.length > 0) return res.json(data);
    else return res.json(" No Record Found ");
  });
});
// Authintication / End



