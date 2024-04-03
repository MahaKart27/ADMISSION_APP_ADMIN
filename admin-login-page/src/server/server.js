const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create a pool to handle database connections
const pool = new Pool({
  user: 'postgress',
  host: 'localhost',
  database: 'sushmitha',
  password: '12345',
  port: 5432, // Default PostgreSQL port
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query the database to find the user
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

    // If a user with the provided credentials exists, authentication is successful
    if (result.rows.length > 0) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
