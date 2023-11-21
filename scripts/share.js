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
const form = document.getElementById("sharePriceForm");

//------------------------------------------------------------------------
//----------------Connects to the Firestore database----------------------
//------------------------------------------------------------------------

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userId = firebase.auth().currentUser.uid;
    const timeStamp = new Date().toISOString();
    let photoFile = document.getElementById('photoBox').files[0];

    let uploadPromise;

    // Conditionally handle photo upload
    if (photoFile) {
        // If a photo is selected, upload it and get the URL
        uploadPromise = firebase.storage().ref(`photos/${userId}/${timeStamp}`).put(photoFile)
            .then(snapshot => snapshot.ref.getDownloadURL());
    } else {
        // If no photo is selected, resolve the promise with a null URL
        uploadPromise = Promise.resolve(null);
    }

    uploadPromise.then(photoURL => {
        // Collect the form data
        const formData = {
            product: product.value,
            price: price.value,
            amount: amount.value,
            variety: variety.value,
            plu: plu.value,
            storeName: storeName.value,
            address: address.value,
            photo: photoURL, // This will be null if no photo was uploaded
            last_updated: firebase.firestore.FieldValue.serverTimestamp(),
            user_id: userId,
        };

        // Save the form data to localStorage to be used in share_review.js
        localStorage.setItem('userId', userId);
        localStorage.setItem('documentTimestamp', timeStamp);

        // Upload the form data to Firestore
        return db.collection("users").doc(userId).collection("user_uploads").doc(timeStamp).set(formData, { merge: true });
    })
    .then(() => {
        // Increase user's score by 1
        return db.collection("users").doc(userId).update({
            score: firebase.firestore.FieldValue.increment(1),
            last_updated: firebase.firestore.FieldValue.serverTimestamp(),
        });
    })
        .then(() => {
            return db.collection("users").doc(userId).get();
        })
        .then((userDoc) => {
            const currentScore = userDoc.data().score;
            let newTitle = "";

            // User title based on the score
            if (currentScore >= 0 && currentScore <= 10) {
                newTitle = "Egg Peasant";
            } else if (currentScore <= 20) {
                newTitle = "Egg Baron";
            } else if (currentScore <= 30) {
                newTitle = "Egg Viscount";
            } else if (currentScore <= 40) {
                newTitle = "Egg Earl";
            } else if (currentScore <= 50) {
                newTitle = "Egg Marquess";
            } else if (currentScore <= 60) {
                newTitle = "Egg Duke";
            } else {
                newTitle = "Egg King";
            }

            // Update title to database based on the new score
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

