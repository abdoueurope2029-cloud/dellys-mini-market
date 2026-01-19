# Dellys Mini Market

A mini Amazon-like marketplace built with Node.js, Express, and SQLite.

## Features

- View all products in a responsive grid layout
- View detailed information about each product
- Add new products with image uploads
- Clean and modern UI with responsive design

## Installation

1. Clone this repository:
   ```
   git clone <repository-url>
   cd dellys
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   node server.js
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `server.js` - Main server file with Express setup and API routes
- `database.db` - SQLite database (created automatically)
- `public/` - Static files directory
  - `index.html` - Home page displaying all products
  - `product.html` - Product details page
  - `add-product.html` - Form to add new products
  - `style.css` - CSS styles for all pages
  - `script.js` - JavaScript for home page
  - `product.js` - JavaScript for product details page
  - `add-product.js` - JavaScript for add product form
- `uploads/` - Directory to store uploaded images (created automatically)

## API Endpoints

- `GET /products` - Get all products
- `GET /products/:id` - Get a single product by ID
- `POST /products` - Add a new product (with image upload)

## Technologies Used

- Node.js
- Express.js
- SQLite
- Multer (for file uploads)
- HTML5
- CSS3
- JavaScript (ES6+)
