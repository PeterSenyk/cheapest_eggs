document.addEventListener('DOMContentLoaded', (event) => {
    const userId = localStorage.getItem('userId');
    const documentTimestamp = localStorage.getItem('documentTimestamp');

    if (userId && documentTimestamp) {
        db.collection("pending_uploads").doc(userId).collection("user_uploads").doc(documentTimestamp).get()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    console.log("Retrieved data:", data); // Log the retrieved data to see what's available

                    // Populate the form fields
                    document.getElementById('product').value = data.product || '';
                    document.getElementById('price_box').value = data.price || '';
                    document.getElementById('amount').value = data.amount || '';
                    document.getElementById('location').value = data.location || '';
                    
                    // Check the price value explicitly
                    console.log("Price value from Firestore:", data.price);
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }
});