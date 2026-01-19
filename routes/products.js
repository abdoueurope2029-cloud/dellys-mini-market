const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = process.env.NODE_ENV === 'production' ? 
      '/opt/render/project/src/uploads' : 
      'uploads';
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get all products (with optional search query)
router.get('/', (req, res) => {
  const searchTerm = req.query.search || '';

  let query = 'SELECT * FROM products';
  let params = [];

  if (searchTerm) {
    query += ' WHERE name LIKE ? OR description LIKE ?';
    params = [`%${searchTerm}%`, `%${searchTerm}%`];
  }

  // Order by id descending to show newest products first
  query += ' ORDER BY id DESC';

  req.db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get a single product by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;

  req.db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json(row);
  });
});

// Add a new product
router.post('/', upload.single('image'), (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  req.db.run(
    'INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)',
    [name, price, description, image],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.status(201).json({
        id: this.lastID,
        name,
        price,
        description,
        image
      });
    }
  );
});

// Delete a product by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  // First, get the product to check if it exists and get the image path
  req.db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    // Delete the product from the database
    req.db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      // If the product had an image, try to delete it
      if (row.image && row.image.startsWith('/uploads/')) {
        const basePath = process.env.NODE_ENV === 'production' ? 
          '/opt/render/project/src' : 
          path.join(__dirname, '..');
        const imagePath = path.join(basePath, row.image);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error('Failed to delete image:', err);
          }
        });
      }

      res.json({ message: 'Product deleted successfully' });
    });
  });
});

module.exports = router;
