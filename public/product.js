// Function to fetch a single product by ID
async function fetchProduct(id) {
  try {
    const response = await fetch(`/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Function to delete a product
async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
    return;
  }

  try {
    const response = await fetch(`/products/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    // Redirect to home page after successful deletion
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Error: Failed to delete product. Please try again.');
  }
}

// Function to render product details
function renderProductDetails(product) {
  const productDetails = document.getElementById('product-details');
  const deleteContainer = document.getElementById('delete-container');

  if (!productDetails) return;

  if (!product) {
    productDetails.innerHTML = `
      <div class="error-message">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <a href="index.html" class="btn">Back to Products</a>
      </div>
    `;
    if (deleteContainer) {
      deleteContainer.innerHTML = '';
    }
    return;
  }

  // Handle image source
  const imageSrc = product.image || 'https://picsum.photos/seed/product' + product.id + '/500/500.jpg';

  productDetails.innerHTML = `
    <div class="product-details-image">
      <img src="${imageSrc}" alt="${product.name}">
    </div>
    <div class="product-details-info">
      <h1 class="product-details-name">${product.name}</h1>
      <p class="product-details-price">$${parseFloat(product.price).toFixed(2)}</p>
      <p class="product-details-description">${product.description || 'No description available for this product.'}</p>
    </div>
  `;

  // Add delete button
  if (deleteContainer) {
    deleteContainer.innerHTML = `
      <button id="delete-btn" class="delete-btn">Delete Product</button>
    `;

    // Set up delete button click event
    document.getElementById('delete-btn').addEventListener('click', () => {
      deleteProduct(product.id);
    });
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
  // Get product ID from URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    renderProductDetails(null);
    return;
  }

  const product = await fetchProduct(productId);
  renderProductDetails(product);
});
