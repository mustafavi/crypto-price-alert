const express = require('express');
const sql = require('mssql');

// Create an Express app
const app = express();

// Set the port
const port = 3000;

// SERVER=DESKTOP-ST45782
// DATABASE=SPORTAL
// USER=sa
// PASSWORD=mustafavi
// DB_PORT=1433
// PORT=8080
// SESSION_SECRET=sessionsecretkeygoeshere
// ACCESS_TOKEN_SECRET=abc
// REFRESH_TOKENSECRET=def

// Configure the SQL Server connection
const sqlConfig = {
  user: 'sa', // SQL Server username
  password: 'mustafavi', // SQL Server password
  server: 'DESKTOP-ST45782', // SQL Server host
  database: 'CryptoPriceAlert', // Database name,
  DB_PORT: 1433,
  //  PORT: 8080,
  options: {
    encrypt: false, // Use encryption
    trustServerCertificate: true, // Trust the server certificate (useful for local setups)
  },
};

// You can check wheahter you can connect slq or not.
// sql
//   .connect(sqlConfig)
//   .then(() => console.log('Connected!'))
//   .catch((err) => console.error('Connection error:', err));

// Set up a simple endpoint to test the SQL connection
app.get('/', async (req, res) => {
  try {
    // Connect to SQL Server
    await sql.connect(sqlConfig);

    // Run a simple query to test
    const result = await sql.query`SELECT TOP 1 * FROM tblCrypto`;

    // Send result as response
    res.json(result.recordset);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'SQL Server connection failed', details: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
