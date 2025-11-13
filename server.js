// Import the Express library
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Serve static files from the 'css' directory explicitly
app.use('/css', express.static(path.join(__dirname, 'css')));

// Route for dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Route for report
app.get('/report', (req, res) => {
  res.sendFile(path.join(__dirname, 'report.html'));
});

// Ensure the root route serves the dashboard.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});