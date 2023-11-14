//------------------------------------------------------------------------
//----------------Returns the form inputs as variables--------------------
//------------------------------------------------------------------------

const product = document.getElementById("productBox");
const price = document.getElementById("priceBox");
const amount = document.getElementById("amountBox");
const variety = document.getElementById("varietyBox");
const plu = document.getElementById("pluBox");
const storeName = document.getElementById("storeNameBox");
const address = document.getElementById("addressBox");
const photoFile = document.getElementById('photoBox').files[0];
const form = document.getElementById("sharePriceForm");


//------------------------------------------------------------------------
//----------------Connects to the Firestore database----------------------
//------------------------------------------------------------------------

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userId = firebase.auth().currentUser.uid;
    const timeStamp = new Date().toISOString();
    const photoFile = document.getElementById('photoBox').files[0];

    if (!photoFile) {
        console.error("No file selected for upload.");
        return; // Exit if no file is selected
    }

//------------------------------------------------------------------------
//----------------First, upload the photo to Firebase Storage-------------
//------------------------------------------------------------------------

    firebase.storage().ref(`photos/${userId}/${timeStamp}`).put(photoFile)
        .then(snapshot => snapshot.ref.getDownloadURL()) // Get the photo URL from the upload in firebase storage
        .then(photoURL => { 
            // Collect the rest of the form data
            const productBox = product.value;
            const priceBox = price.value;
            const amountBox = amount.value;
            const varietyBox = variety.value;
            const pluBox = plu.value;
            const storeNameBox = storeName.value;
            const addressBox = address.value;

            // Save the form data to localStorage to be used in share_review.js
            localStorage.setItem('userId', userId);
            localStorage.setItem('documentTimestamp', timeStamp);

            // Upload the form data to Firestore
            return db.collection("users").doc(userId).collection("user_uploads").doc(timeStamp).set({
                product: productBox,
                price: priceBox,
                amount: amountBox,
                variety: varietyBox,
                plu: pluBox,
                storeName: storeNameBox,
                address: addressBox,
                photo: photoURL, // Store the URL from the upload in firebase storage, not the file object
                last_updated: firebase.firestore.FieldValue.serverTimestamp(),
                user_id: userId,
            }, { merge: true });
        })
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
            window.location = "./share_review.html";  // Redirect to share_review.html after upload
        })
        .catch((error) => {
            // Handle any errors here
            console.error("Error writing document: ", error);
        });
});

