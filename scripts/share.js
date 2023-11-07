const product = document.getElementById("product");
const price = document.getElementById("price");
const amount = document.getElementById("amount");
const locationField = document.getElementById("location");  
const photo = document.getElementById("photo");
const form = document.getElementById("share-price-form");


// add a product to the database
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const productField = product.value
    const priceField = price.value
    const amountField = amount.value
    const locationBox = locationField.value
    const userId = firebase.auth().currentUser.uid
    const timeStamp = new Date().toISOString();
    db.collection("pending_uploads").doc(userId).collection("user_uploads").doc(timeStamp).set({
        
        product: productField,
        price: priceField,
        amount: amountField,
        location: locationBox,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),
        user_id: userId,
    }, { merge: true })
        .then(() => {
            // This will execute after the set() operation is successful
            window.location = "./share_review.html";
        })
        .catch((error) => {
            // Handle any errors here
            console.error("Error writing document: ", error);
        });
})
