//------------------populate the form field------------------//

document.addEventListener('DOMContentLoaded', (event) => {
    const userId = localStorage.getItem('userId');
    const documentTimestamp = localStorage.getItem('documentTimestamp');
    console.log(documentTimestamp)

    if (userId && documentTimestamp) {
        db.collection("users").doc(userId).collection("user_uploads").doc(documentTimestamp).get()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    console.log("Retrieved data:", data); // Log the retrieved data to see what's available

                    // Populate the form fields
                    document.getElementById('productBox').value = data.product || '';
                    document.getElementById('priceBox').value = data.price || '';
                    document.getElementById('amountBox').value = data.amount || '';
                    document.getElementById('varietyBox').value = data.variety || '';
                    document.getElementById('pluBox').value = data.pluBox || '';
                    document.getElementById('storeNameBox').value = data.storeName || '';
                    document.getElementById('addressBox').value = data.address || '';

                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }
});



function editUserInfo() {
    //Enable the form fields
    document.getElementById('reviewPriceForm').disabled = false;
    document.getElementById('reviseBtn').disabled = false;
}

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
    // localStorage.setItem('userId', userId);
    // localStorage.setItem('documentTimestamp', timeStamp);

    // Upload to firestore database
    db.collection("users").doc(userId).collection("user_uploads").doc(documentTimestamp).update({
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
            // This will execute after the set() operation is successful
            // window.location = "./share_review.html";
        })
        .catch((error) => {
            // Handle any errors here
            console.error("Error writing document: ", error);
        });
})



// function reviseInfo() {
//     console.log("Inside reviseInfo")
//     productValue = document.getElementById('productBox').value;
//     console.log(productValue)
//     priceBox = document.getElementById('priceBox').value
//     amountBox = document.getElementById('amountBox').value
//     varietyBox = document.getElementById('varietyBox').value 
//     pluBox = document.getElementById('pluBox').value
//     storeNameBox = document.getElementById('storeNameBox').value
//     addressBox = document.getElementById('addressBox').value
//     //Update current user info
//     users.userId.user_uploads.documentTimestamp.update({
//         product: productValue,
//         price: priceBox,
//         amount: amountBox,
//         variety: varietyBox,
//         plu: pluBox,
//         storeName: storeNameBox,
//         address: addressBox,
//         last_updated: firebase.firestore.FieldValue.serverTimestamp(),
//         user_id: userId,
//     })
// }