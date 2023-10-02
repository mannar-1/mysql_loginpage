// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Create a database connection pool
// const db = mysql.createPool({
//    host: "localhost",
//    user: "root",
//    password: "",
//    database: "test"
// });

// // Root endpoint to test the API
// app.get('/', (req, res) => {
//     return res.json("Welcome to the API");
// });

// // Endpoint to fetch employees from the database
// app.get('/emps', (req, res) => {
//     const sql = "insert into emp(name,empid)values('sada',4)";
//     db.query(sql, (err, data) => {
//         if (err) {
//             console.error("Database error:", err);
//             return res.status(500).json({ error: "Internal Server Error" });
//         }
//         return res.json(data);
//     });
// });
// app.get('/getemps',(req,res)=>{
//     const sql="select * from emp";
//     db.query(sql,(err,data)=>{
//         if(err){
//             return res.json(err);
//         }
//         return res.json(data);

//     })
// })

// // Start the server
// const port = process.env.PORT || 8081;
// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//all users

app.get('/api/students',(req,res)=>{
        const sql="select * from students";
        db.query(sql,(err,data)=>{
            if(err){
                return res.json(err);
            }
            return res.json(data);
    
        })
    })
// Signup route
// app.post('/api/signup', async (req, res) => {
//   const {
//     student_firstname,
//     student_lastname,
//     rollnumber,
//     classofstudent,
//     section,
//     parent_mobile_number,
//     password,
//   } = req.body;

//   try {
//     // Hash the password before storing it in the database
//    // const hashedPassword = await bcrypt.hash(password, 10);

//     const insertQuery = `INSERT INTO students (student_firstname, student_lastname, rollnumber, class, section, parent_mobile_number, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;

//     db.query(
//       insertQuery,
//       [
//         student_firstname,
//         student_lastname,
//         rollnumber,
//         classofstudent,
//         section,
//         parent_mobile_number,
//         password,
//       ],
//       (err, result) => {
//         if (err) {
//           console.error(err);
//           res.status(500).json({ message: 'Error inserting data into the database' });
//         } else {
//           res.status(200).json({ message: 'Signup successful' });
//         }
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error hashing password' });
//   }
// });

// Login route
app.post('/api/signup', async (req, res) => {
    const { student_firstname, student_lastname, rollnumber, classofstudent, section, parent_mobile_number, email, password } = req.body;
  
    // Hash the password before storing it
    const saltRounds = 10; // Number of salt rounds
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Insert user data into the database
      const insertQuery = 'INSERT INTO students (student_firstname, student_lastname, rollnumber, class, section, parent_mobile_number,  password,email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(
        insertQuery,
        [student_firstname, student_lastname, rollnumber, classofstudent, section, parent_mobile_number,  hashedPassword,email],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: 'Database error' });
          } else {
            res.status(200).json({ message: 'Signup successful' });
          }
        }
      );
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Signup failed' });
    }
  });

//signup
// app.post('/api/signin', async (req, res) => {
//     const { firstname, password } = req.body; // Updated request body parameters
//      console.log(firstname,password);
//     const selectQuery = 'SELECT * FROM students WHERE student_firstname = ?'; // Updated SQL query
  
//     db.query(selectQuery, [firstname], async (err, rows) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Database error' });
//       } else if (rows.length === 0) {
//         res.status(404).json({ message: 'User not found' });
//       } else {
//         const user = rows[0];
//       //  const passwordMatch = await bcrypt.compare(password, user.password);
//      const passwordMatch = (password === user.password);
//       console.log(passwordMatch)
//         if (passwordMatch) {
//           res.status(200).json({ message: 'Login successful' });
//         } else {
//           res.status(401).json({ message: 'Incorrect password' });
//         }
//       }
//     });
//   });

app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;
  console.log(email,password);
  
    // Query the user by email
    const selectQuery = 'SELECT * FROM students WHERE email = ?';
    db.query(selectQuery, [email], async (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Database error' });
      } else if (rows.length === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (passwordMatch) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Incorrect password' });
        }
      }
    });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

