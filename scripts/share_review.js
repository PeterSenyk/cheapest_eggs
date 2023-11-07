document.addEventListener('DOMContentLoaded', (event) => {
    // Retrieve the values from localStorage and set them as the current values of the form fields
    document.getElementById('product').value = localStorage.getItem('product') || '';
    document.getElementById('price').value = localStorage.getItem('price') || '';
    document.getElementById('amount').value = localStorage.getItem('amount') || '';
    document.getElementById('location').value = localStorage.getItem('location') || '';
    // If you also want to handle the photo, you will need additional logic since file inputs cannot be set directly
});

