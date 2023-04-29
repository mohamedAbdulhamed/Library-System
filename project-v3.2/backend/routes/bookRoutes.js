const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');

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

const FILE_MAX_SIZE = 150 * 1024 * 1024; // 157286400 bytes = 150MB


router.get('/get-books', (req, res) => {
  const sql = 'SELECT * FROM books';
  db.query(sql, (err, data) => {
    if (err) return res.status(404).json({ err: 'Error Occured!' });
    if (data.length > 0) return res.status(200).json(data);
    else return res.status(404).json({ err: 'No Record Found!'});
  });
});

router.get('/get-book/:id', (req, res) => {
  const sql = 'SELECT * FROM books WHERE id = ?';
  const values = [req.params.id];
  db.query(sql, [values] , (err, data) => {
    if (err) return res.status(500).json({err: "Error Occured!", devErr: err});
    if (data.length > 0) return res.status(200).json(data);
    else return res.status(404).json({err: "No Record Found!", devErr: "No Record Found!"});
  });
});

router.get('/get-books-by-field/:field', (req, res) => {
  const sql = 'SELECT * FROM books WHERE field = ?';
  const values = [req.params.field];
  db.query(sql, [values] , (err, data) => {
    if (err) return res.status(500).json({err: "Error Occured!", devErr: err});
    if (data.length > 0) return res.status(200).json(data);
    else return res.status(404).json({err: "No Record Found!"});
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const { name, ext } = path.parse(file.originalname);
    cb(null, file.fieldname + '-' + name + '-' + Date.now() + path.extname(file.originalname));
  }
});
const uploads = multer({storage: storage});
// allowed file types
// Could have used mime-types package instead but whatever
const exe = ['pdf', 'txt', 'docx', 'doc'];

router.post('/add-book', uploads.single("pdf"),(req, res) => {
  // Check if file is selected
  if (!req.file) return res.status(400).json({ msg: 'No File Selected!' });
  // Check if file type is allowed
  const fileExe = req.file.fieldname;
  if (!exe.includes(fileExe)) return res.status(400).json({ msg: 'File Type Not Allowed!' });
  // Check if file size is less than 150MB
  if (req.file.size > FILE_MAX_SIZE ) return res.status(400).json({ msg: 'File Size Too Large! Max File Size is 150MB' });
  // Get the file name3
  const fileName = req.file.filename;


  
  // Check if any of the fields are empty
  if (req.body.name == '' || req.body.description == '' || req.body.author == '' || req.body.field == '' || req.body.dop == '' || req.body.pdf == '') {
    console.log(req.body)
    return res.status(400).json({ msg: 'Empty Parameters' });
  }
  // Check if the book already exists in the database
  db.query('SELECT * FROM books WHERE name = ?', [req.body.name] , (err, data) => {
    if (data.length > 0) return res.status(400).json({ msg: 'A Book With The Same Name Already Exists!'});
  });
  // handle file upload
  if (req.file) {
     // Insert the book into the database
    const sql = "INSERT INTO books (`name`,`description`,`author`,`field`,`dop`,`pdf`) VALUES (?)";
    const values = [req.body.name, req.body.description, req.body.author, req.body.field, req.body.dop, fileName];
    db.query(sql, [values] , (err, data) => {
      if (err) return res.status(400).json({msg: "Error Occured!"});
      return res.status(200).json({msg: "Book Added Successfully!"});
    });
  }else {
    return res.status(400).json({ msg: 'No File Selected!' });
  }
});

router.post('/update-book/:id', (req, res) => {
  // delete the old file
  db.query('SELECT * FROM books WHERE id = ?', [req.params.id] , (err, data) => {
    if (err) return res.status(500).json({err: "Error Occured!", devErr: err});
    if (data.length > 0) {
      const oldFile = data[0].pdf;
      fs.unlink('./public/uploads/' + oldFile, (err) => {
        if (err) return res.status(500).json({err: "Error Occured!", devErr: err});
      });
    }else {
      return res.status(404).json({err: "No Record Found!"});
    }
  });
  // Check if file is selected
  if (!req.file) return res.status(400).json({ msg: 'No File Selected!' });
  // Check if file type is allowed
  const fileExe = req.file.fieldname;
  if (!exe.includes(fileExe)) return res.status(400).json({ msg: 'File Type Not Allowed!' });
  // Check if file size is less than 150MB
  if (req.file.size > FILE_MAX_SIZE ) return res.status(400).json({ msg: 'File Size Too Large! Max File Size is 150MB' });
  // Get the file name3
  const fileName = req.file.filename;
  if (req.body.name == '' || req.body.description == '' || req.body.author == '' || req.body.field == '' || req.body.dop == '') {
    return res.status(400).json({ msg: 'Empty Parameters' });
  }
  const sql = "UPDATE books SET `name` = ?, `description` = ?, `author` = ?, `field` = ?, `dop` = ?, `pdf` = ? WHERE id = ?";
  const values = [req.body.name, req.body.description, req.body.author, req.body.field, req.body.dop, fileName, req.params.id];
  db.query(sql, values , (err, data) => {
    if (err) return res.json({msg: err});
    return res.status(200).json({msg: "Book Updated Successfully!"});
  });
});

router.delete('/delete-book/:id', (req, res) => {
  // delete the file
  db.query('SELECT * FROM books WHERE id = ?', [req.params.id] , (err, data) => {
    if (err) return res.status(500).json({err: "Error Occured!", devErr: err});
    if (data.length > 0) {
      const oldFile = data[0].pdf;
      fs.unlink('./public/uploads/' + oldFile, (err) => {
        if (err) return res.status(500).json({err: "Error Occured!", devErr: err});
      });
    }else {
      return res.status(404).json({err: "No Record Found!"});
    }
  });
  const sql = "DELETE FROM books WHERE id = ?";
  const values = [req.params.id];
  db.query(sql, values , (err, data) => {
    if (err) return res.status(400).json({msg: "Error Occured!"});
    return res.status(200).json({msg: "Book Deleted Successfully!"});
  });
});

// download book
router.get('/download-book/:id', (req, res) => {
  const sql = 'SELECT * FROM books WHERE id = ?';
  const values = [req.params.id];
  db.query(sql, [values] , (err, data) => {
    if (err) return res.status(500).json({ err: 'Error Occured!'});
    if (data.length > 0) {
      const file = `./public/uploads/${data[0].pdf}`;
      res.download(file);
    }
    else return res.status(404).json({ err: 'No Record Found!'});
  });
});


module.exports = router;