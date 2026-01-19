// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const messageElement = document.getElementById('message');

  try {
    const response = await fetch('/products', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    const newProduct = await response.json();

    // Show success message
    messageElement.textContent = 'Product added successfully!';
    messageElement.className = 'message success';

    // Reset form
    form.reset();

    // Optional: Redirect to product details page after a short delay
    setTimeout(() => {
      window.location.href = `product.html?id=${newProduct.id}`;
    }, 1500);

  } catch (error) {
    console.error('Error adding product:', error);

    // Show error message
    messageElement.textContent = 'Error: Failed to add product. Please try again.';
    messageElement.className = 'message error';
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-product-form');

  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});
