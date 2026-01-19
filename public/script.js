// Function to fetch products from the API with optional search query
async function fetchProducts(searchTerm = '') {
  try {
    let url = '/products';
    if (searchTerm) {
      url += `?search=${encodeURIComponent(searchTerm)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Function to render products in the grid
function renderProducts(products) {
  const productsGrid = document.getElementById('products-grid');

  if (!productsGrid) return;

  // Clear existing content
  productsGrid.innerHTML = '';

  // If no products, show a message
  if (products.length === 0) {
    productsGrid.innerHTML = '<p>No products available at the moment.</p>';
    return;
  }

  // Create and append product cards
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    // Handle image source
    const imageSrc = product.image || 'https://picsum.photos/seed/product' + product.id + '/500/500.jpg';

    productCard.innerHTML = `
      <img src="${imageSrc}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${parseFloat(product.price).toFixed(2)}</p>
        <a href="product.html?id=${product.id}" class="product-btn">View Product</a>
      </div>
    `;

    productsGrid.appendChild(productCard);
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  renderProducts(products);

  // Set up search functionality
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  // Search when button is clicked
  searchBtn.addEventListener('click', async () => {
    const searchTerm = searchInput.value.trim();
    const products = await fetchProducts(searchTerm);
    renderProducts(products);
  });

  // Search when Enter key is pressed in the input field
  searchInput.addEventListener('keyup', async (event) => {
    if (event.key === 'Enter') {
      const searchTerm = searchInput.value.trim();
      const products = await fetchProducts(searchTerm);
      renderProducts(products);
    }
  });

  // Clear search when clear button is clicked
  clearSearchBtn.addEventListener('click', async () => {
    searchInput.value = '';
    const products = await fetchProducts();
    renderProducts(products);
  });
});
