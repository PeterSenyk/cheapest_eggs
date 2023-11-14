// Global reference to the current user's document
var currentUser;

document.addEventListener('DOMContentLoaded', (event) => {
    // Attempt to retrieve user ID and document timestamp from localStorage
    const userId = localStorage.getItem('userId');
    const documentTimestamp = localStorage.getItem('documentTimestamp');
    console.log("Timestamp:", documentTimestamp);

    if (userId && documentTimestamp) {
        // Reference to the specific document in the user_uploads collection
        currentUser = db.collection("users").doc(userId);
        currentUser.collection("user_uploads").doc(documentTimestamp).get()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    console.log("Retrieved data:", data);

                    // Populate the form fields with the data
                    document.getElementById('productBox').value = data.product || '';
                    document.getElementById('priceBox').value = data.price || '';
                    document.getElementById('amountBox').value = data.amount || '';
                    document.getElementById('varietyBox').value = data.variety || '';
                    document.getElementById('pluBox').value = data.plu || '';
                    document.getElementById('storeNameBox').value = data.storeName || '';
                    document.getElementById('addressBox').value = data.address || '';
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    }
});
//call the function to run it 
populateUserInfo();

function editShareInfo() {
    //Enable the form fields
    console.log("Inside edituserinfo")
    document.getElementById('reviewPriceForm').disabled = false;
}


function saveShareInfo() {
    // Retrieve values from the form fields
    var productValue = document.getElementById('productBox').value;
    var priceValue = document.getElementById('priceBox').value;
    var amountValue = document.getElementById('amountBox').value;
    var varietyValue = document.getElementById('varietyBox').value;
    var pluValue = document.getElementById('pluBox').value;
    var storeNameValue = document.getElementById('storeNameBox').value;
    var addressValue = document.getElementById('addressBox').value;

    // Retrieve user ID and document timestamp from localStorage
    const userId = localStorage.getItem('userId');
    const documentTimestamp = localStorage.getItem('documentTimestamp');

    // Ensure we have a user ID and a document timestamp
    if (userId && documentTimestamp) {
        // Define currentUser within this function's scope
        var currentUser = db.collection("users").doc(userId);

        // Update the document in the user_uploads collection
        currentUser.collection("user_uploads").doc(documentTimestamp).update({
            product: productValue,
            price: priceValue,
            amount: amountValue,
            variety: varietyValue,
            plu: pluValue,
            storeName: storeNameValue,
            address: addressValue,
            last_updated: firebase.firestore.FieldValue.serverTimestamp(),
            user_id: userId
        }).then(() => {
            console.log("Document successfully updated!");
        }).catch(error => {
            console.error("Error updating document: ", error);
        });
    } else {
        console.log("User ID or Document Timestamp not found in localStorage.");
    }
}

// Event listeners should be set inside the DOMContentLoaded event listener to ensure elements are loaded
document.addEventListener('DOMContentLoaded', () => {
    // ... your existing code to populate the form ...

    // Set event listeners for the buttons
    document.getElementById('reviseBtn').addEventListener('click', editShareInfo);
    document.getElementById('saveBtn').addEventListener('click', saveShareInfo);
});
