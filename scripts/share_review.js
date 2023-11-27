// Global reference to the current user's document
var currentUser;

document.addEventListener('DOMContentLoaded', (event) => {
    // Attempt to retrieve user ID and document timestamp from localStorage from the previous page share.html to populate the form fields
    const userId = localStorage.getItem('userId');
    const documentTimestamp = localStorage.getItem('documentTimestamp');
    console.log("Timestamp:", documentTimestamp);

    if (userId && documentTimestamp) {
        // Reference to the specific document in the user_uploads collection based on the document timestamp
        currentUser = db.collection("users").doc(userId);
        currentUser.collection("user_uploads").doc(documentTimestamp).get()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    console.log("Retrieved data:", data);

                    // Populate the form fields with the data from the previous share.html page
                    document.getElementById('productBox').value = data.product || '';
                    document.getElementById('priceBox').value = data.price || '';
                    document.getElementById('amountBox').value = data.amount || '';
                    document.getElementById('varietyBox').value = data.variety || '';
                    document.getElementById('pluBox').value = data.plu || '';
                    document.getElementById('storeNameBox').value = data.storeName || '';
                    document.getElementById('addressBox').value = data.address || '';

                    // Populate the photo if it exists
                    if (data.photo) {
                        document.getElementById('photoPreview').src = data.photo;
                    }
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    }

    // Set event listeners for the buttons and file input
    document.getElementById('photoBox').addEventListener('change', handleFileSelect, false);
    document.getElementById('editBtn').addEventListener('click', editShareInfo);
    document.getElementById('saveBtn').addEventListener('click', saveShareInfo);
});

function handleFileSelect(event) {
    const reader = new FileReader();
    reader.onload = function (e) {
        // Update the photo preview from the previous share.html page   **** change CSS to better fit the page and be responsive
        document.getElementById('photoPreview').src = e.target.result;
    };

    // Read the selected file as a data URL
    reader.readAsDataURL(event.target.files[0]);
}

function editShareInfo() {
    // Enable the form fields      **** change the form fields to start out disabled
    console.log("Inside editShareInfo");
    var formElements = document.getElementById('reviewPriceForm').elements;
    for (var i = 0, len = formElements.length; i < len; ++i) {
        formElements[i].disabled = false;
    }
    var saveBtn = document.getElementById('saveBtn');
    saveBtn.disabled = false
    
    // Attach the event listener to the save button
    saveBtn.addEventListener('click', saveShareInfo);
}

function saveShareInfo() {
    // Retrieve values from the form fields and update the Firestore document with any changes
    var productValue = document.getElementById('productBox').value;
    var priceValue = document.getElementById('priceBox').value;
    var amountValue = document.getElementById('amountBox').value;
    var varietyValue = document.getElementById('varietyBox').value;
    var pluValue = document.getElementById('pluBox').value;
    var storeNameValue = document.getElementById('storeNameBox').value;
    var addressValue = document.getElementById('addressBox').value;
    const photoFile = document.getElementById('photoBox').files[0];

    // Retrieve user ID and document timestamp from localStorage to make sure the previously shared document is updated
    const userId = localStorage.getItem('userId');
    const documentTimestamp = localStorage.getItem('documentTimestamp');

    // Check if a new photo was selected for upload
    if (photoFile) {
        // Upload the new photo to Firebase Storage first
        firebase.storage().ref(`photos/${userId}/${documentTimestamp}`).put(photoFile)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(photoURL => {
                // Update the document with the new photo URL and other form data
                return currentUser.collection("user_uploads").doc(documentTimestamp).update({
                    product: productValue,
                    price: priceValue,
                    amount: amountValue,
                    variety: varietyValue,
                    plu: pluValue,
                    storeName: storeNameValue,
                    address: addressValue,
                    photo: photoURL, // Store the new photo URL
                    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
                });
            })
            .then(() => {
                console.log("Document successfully updated with new photo!");
                Swal.fire({
                    title: "Edit Successful",
                    text: "Your upload has been updated with a new photo!",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error("Error updating document with new photo: ", error);
            });
    } else {
        // If no new photo is selected, update other form data only
        currentUser.collection("user_uploads").doc(documentTimestamp).update({
            product: productValue,
            price: priceValue,
            amount: amountValue,
            variety: varietyValue,
            plu: pluValue,
            storeName: storeNameValue,
            address: addressValue,
            last_updated: firebase.firestore.FieldValue.serverTimestamp(),
        })
            .then(() => {
                console.log("Document successfully updated!");
                Swal.fire({
                    title: "Edit Successful",
                    text: "Your upload has been updated!",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error("Error updating document: ", error);
            });
    }
}
