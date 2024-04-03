const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// PostgreSQL connection pool
const pool = new Pool({
    user: 'your_username',       // Replace with your PostgreSQL username
    host: 'localhost',
    database: 'postgres',        // Database name
    password: 'newpassword',   // Replace with your PostgreSQL password
    port: 5432,
});

app.use(bodyParser.json());

// API endpoint to fetch student data
app.get('/api/students', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT name, fathers_name, email, phone_number, age, highest_qualification, sop FROM applicants');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
