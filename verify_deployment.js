// Verification script for Dellys Mini Market deployment
const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('Dellys Mini Market - Deployment Verification');
console.log('===========================================');

// Check if all required files exist
const requiredFiles = [
  'server.js',
  'package.json',
  'package-lock.json',
  'render.yaml',
  'database.db',
  'public/index.html',
  'public/style.css',
  'public/script.js',
  'routes/products.js'
];

console.log('\nChecking required files...');
let allFilesExist = true;
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✓ ${file}`);
  } else {
    console.log(`✗ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check if uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (fs.existsSync(uploadsDir)) {
  console.log(`✓ uploads directory exists`);
} else {
  console.log(`✗ uploads directory - MISSING`);
}

// Check if database has products
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

console.log('\nChecking database...');
db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
  if (err) {
    console.log(`✗ Error checking database: ${err.message}`);
  } else {
    console.log(`✓ Database contains ${row.count} products`);
  }
  db.close();
});

// Display deployment information
console.log('\nDeployment Information');
console.log('=====================');
console.log('Repository: https://github.com/abdoueurope2029-cloud/dellys-mini-market.git');
console.log('Expected URL: https://dellys-mini-market.onrender.com');
console.log('Region: Frankfurt');
console.log('Environment: Node');
console.log('Build Command: npm install');
console.log('Start Command: npm start');
console.log('Health Check Path: /');

// Check if the server is running locally
console.log('\nChecking local server...');
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
  timeout: 2000
};

const req = http.request(options, (res) => {
  console.log(`✓ Local server is running (status: ${res.statusCode})`);
});

req.on('error', (err) => {
  console.log(`✗ Local server is not running: ${err.message}`);
  console.log('To start the server locally, run: npm start');
});

req.on('timeout', () => {
  console.log('✗ Request to local server timed out');
  req.destroy();
});

req.end();

console.log('\nTroubleshooting');
console.log('===============');
console.log('If the deployed application shows "Not Found":');
console.log('1. Check the Render deployment logs');
console.log('2. Verify the health check path is set to "/"');
console.log('3. Ensure all routes are properly configured');
console.log('4. Check TROUBLESHOOTING.md for more details');
