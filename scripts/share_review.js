document.addEventListener('DOMContentLoaded', (event) => {
    // Check if we have saved values in localStorage
    if (localStorage.getItem('product')) {
        document.getElementById('formControlInputProduct').value = localStorage.getItem('product');
    }
    if (localStorage.getItem('price')) {
        document.getElementById('formControlInputPrice').value = localStorage.getItem('price');
    }
    if (localStorage.getItem('amount')) {
        document.getElementById('formControlInputAmount').value = localStorage.getItem('amount');
    }
    if (localStorage.getItem('location')) {
        document.getElementById('formControlInputLocation').value = localStorage.getItem('location');
    }
});
