const product = document.getElementById("productBox");
const price = document.getElementById("priceBox");
const amount = document.getElementById("amountBox");
const variety = document.getElementById("varietyBox");
const plu = document.getElementById("pluBox");
const storeName = document.getElementById("storeNameBox");
const address = document.getElementById("addressBox");
const photo = document.getElementById("photoBox");
const form = document.getElementById("sharePriceForm");

// Add a product to the database
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const productBox = product.value;
    const priceBox = price.value;
    const amountBox = amount.value;
    const varietyBox = variety.value;
    const pluBox = plu.value;
    const storeNameBox = storeName.value;
    const addressBox = address.value;
    const userId = firebase.auth().currentUser.uid;
    const timeStamp = new Date().toISOString();

    // Save the form data to localStorage
    localStorage.setItem('userId', userId);
    localStorage.setItem('documentTimestamp', timeStamp);

    // Upload to Firestore database
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
    }, { merge: true })
        .then(() => {
            // Add 1 to user's score and update title based on new score
            return db.collection("users").doc(userId).update({
                score: firebase.firestore.FieldValue.increment(1),
                last_updated: firebase.firestore.FieldValue.serverTimestamp(),
            });
        })
        .then(() => {
            // Get the updated score and update the title
            return db.collection("users").doc(userId).get();
        })
        .then((userDoc) => {
            const currentScore = userDoc.data().score;
            let newTitle = "";

            // Logic to determine the new title based on the score
            if (currentScore >= 0 && currentScore <= 10) {
                newTitle = "Egg Peasant";
            } else if (currentScore >= 11 && currentScore <= 20) {
                newTitle = "Egg Baron";
            } else if (currentScore >= 21 && currentScore <= 30) {
                newTitle = "Egg Viscount";
            } else if (currentScore >= 31 && currentScore <= 40) {
                newTitle = "Egg Earl";
            } else if (currentScore >= 41 && currentScore <= 50) {
                newTitle = "Egg Marquess";
            } else if (currentScore >= 51 && currentScore <= 60) {
                newTitle = "Egg Duke";
            } else if (currentScore >= 61) {
                newTitle = "Egg King";
            }

            // Update title based on the new score
            return db.collection("users").doc(userId).update({
                title: newTitle
            });
        })
        .then(() => {
            window.location = "./share_review.html";
        })
        .catch((error) => {
            // Handle any errors here
            console.error("Error writing document: ", error);
        });
});
