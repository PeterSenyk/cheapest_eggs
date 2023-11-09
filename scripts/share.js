const product = document.getElementById("productBox");
const price = document.getElementById("priceBox");
const amount = document.getElementById("amountBox");
const variety = document.getElementById("varietyBox");
const plu = document.getElementById("pluBox");
const storeName = document.getElementById("storeNameBox");
const address = document.getElementById("addressBox");
const photo = document.getElementById("photoBox");
const form = document.getElementById("sharePriceForm");


// add a product to the database
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const productBox = product.value
    const priceBox = price.value
    const amountBox = amount.value
    const varietyBox = variety.value
    const pluBox = plu.value
    const storeNameBox = storeName.value
    const addressBox = address.value
    const userId = firebase.auth().currentUser.uid
    const timeStamp = new Date().toISOString();
    // Save the form data to localStorage
    // Upon successful Firebase submission:
    localStorage.setItem('userId', userId);
    localStorage.setItem('documentTimestamp', timeStamp);

    // Upload to firestore database
    db.collection("users").doc(userId).collection("user_uploads").doc(timeStamp).set({
        product: productBox,
        price: priceBox,
        amount: amountBox,
        variety: varietyBox,
        plu: pluBox,
        storeName: storeNameBox,
        address: addressBox,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),
        user_id: userId,
        score: firebase.firestore.FieldValue.increment(1)
    }, { merge: true })
    // add 1 to user's score
    db.collection("users").doc(userId).update({
        score: firebase.firestore.FieldValue.increment(1)
    })
        .then(() => {
            window.location = "./share_review.html";
        })
        .catch((error) => {
            // Handle any errors here
            console.error("Error writing document: ", error);
        });
})
