const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Import routes
const productRoutes = require('./routes/products');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Ensure uploads directory exists
const uploadsDir = process.env.NODE_ENV === 'production' ? 
  '/opt/render/project/src/uploads' : 
  'uploads';

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Database middleware to make db accessible in routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Initialize SQLite database
const dbPath = process.env.NODE_ENV === 'production' ? 
  '/opt/render/project/src/database.db' : 
  './database.db';

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');

    // Create products table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image TEXT
    )`, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Products table is ready.');

        // Insert some sample data if the table is empty
        db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
          if (err) {
            console.error(err.message);
          } else if (row.count === 0) {
            // Add sample products
            const sampleProducts = [
              {
                name: 'Wireless Headphones',
                price: 79.99,
                description: 'High-quality wireless headphones with noise cancellation and 20-hour battery life.',
                image: 'https://picsum.photos/seed/headphones/500/500.jpg'
              },
              {
                name: 'Smart Watch',
                price: 199.99,
                description: 'Advanced fitness tracking, heart rate monitoring, and smartphone integration.',
                image: 'https://picsum.photos/seed/smartwatch/500/500.jpg'
              },
              {
                name: 'Laptop Stand',
                price: 39.99,
                description: 'Ergonomic aluminum laptop stand for improved posture and cooling.',
                image: 'https://picsum.photos/seed/laptopstand/500/500.jpg'
              }
            ];

            const stmt = db.prepare('INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)');

            sampleProducts.forEach(product => {
              stmt.run(product.name, product.price, product.description, product.image);
            });

            stmt.finalize();
            console.log('Sample products added to the database.');
          }
        });
      }
    });
  }
});

// Use product routes
app.use('/products', productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
