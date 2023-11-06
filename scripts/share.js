const product = document.getElementById("product");
const price = document.getElementById("price");
const amount = document.getElementById("amount");
// const location = document.getElementById("location");  #Javascript does not like this ??
const photo = document.getElementById("photo");
const form = document.getElementById("share-price-form");

// add a product to the database
form.addEventListener("submit", (e) =>
{
    e.preventDefault();
    db.collection("pending_uploads").add({
        product: form.product.value,
        price: form.price.value,
        amount: form.amount.value,
        location: form.location.value,
        photo: form.photo.value,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    // form.product.value = "";
    // form.price.value = "";
    // form.amount.value = "";
    // form.location.value = "";
    // form.photo.value = "";
})

