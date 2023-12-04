// Global variable to store the document reference of the logged-in user
let currentUser;

//-----------------------------------------------------------
// Function to populate user information on the profile page
//-----------------------------------------------------------
function populateUserInfo() {
    // Firebase authentication state change listener
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in
        if (user) {
            // Reference to the user document using the user's UID
            currentUser = db.collection("users").doc(user.uid);

            // Retrieve and populate user information
            currentUser.get().then(userDoc => {
                // Extract user data fields
                const userName = userDoc.data().name;
                const userCountry = userDoc.data().country;
                const userCity = userDoc.data().city;
                const picUrl = userDoc.data().profilePic;

                // Populate form fields if data fields are not empty
                if (userName != null) {
                    document.getElementById("nameInput").value = userName;
                }
                if (userCountry != null) {
                    document.getElementById("countryInput").value = userCountry;
                }
                if (userCity != null) {
                    document.getElementById("cityInput").value = userCity;
                }
                if (picUrl != null) {
                    document.getElementById("mypic-goes-here").src = picUrl;
                }
            });
        } else {
            // No user is signed in
            console.log("No user is signed in");
        }
    });
}

// Call the function to populate user information
populateUserInfo();

//-----------------------------------------------------------
// Function to enable form fields for editing user information
//-----------------------------------------------------------
function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;

    // Change button colors for visual indication
    document.querySelector('.save').classList.remove('btn-secondary');
    document.querySelector('.save').classList.add('btn-success');
    document.querySelector('.edit').classList.remove('btn-success');
    document.querySelector('.edit').classList.add('btn-secondary');
}

//--------------------------------------------------
// Function to save edited user information
//--------------------------------------------------
function saveUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Reference to the storage for user profile pictures
        const storageRef = storage.ref("images/" + user.uid + ".jpg");

        // Asynchronous call to upload File Object (global variable ImageFile) to Cloud Storage
        storageRef.put(ImageFile).then(() => {
            // Asynchronous call to get URL from Cloud Storage
            storageRef.getDownloadURL().then(url => {
                // Get form field values
                const userName = document.getElementById('nameInput').value;
                const userCountry = document.getElementById('countryInput').value;
                const userCity = document.getElementById('cityInput').value;

                // Asynchronous call to update form fields in Firestore
                currentUser.update({
                    name: userName,
                    country: userCountry,
                    city: userCity,
                    profilePic: url
                }).then(() => {
                    // Disable form fields after saving
                    document.getElementById('personalInfoFields').disabled = true;
                });
            });
        });
    });

    // Change button colors back to default
    document.querySelector('.save').classList.remove('btn-success');
    document.querySelector('.save').classList.add('btn-secondary');
    document.querySelector('.edit').classList.remove('btn-secondary');
    document.querySelector('.edit').classList.add('btn-success');

    // Alert the user that their profile has been updated
    Swal.fire({
        title: "Saved",
        text: "Your profile has been updated!",
        icon: "success"
    });
}

//-----------------------------------------------------------
// Function to fetch and display additional user information
//-----------------------------------------------------------
function getOtherInfoFromDB() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in
        if (user) {
            // Retrieve user information based on their UID
            db.collection("users").doc(user.uid).get().then(doc => {
                if (doc.exists) {
                    // Extract additional user information
                    const email = doc.data().email;
                    const score = doc.data().score;
                    const title = doc.data().title;

                    // Update elements with retrieved values
                    $("#email").text(email);
                    $("#score").text(score);
                    $("#title").text(title);
                } else {
                    console.log("User document with UID " + user.uid + " does not exist.");
                }
            }).catch(error => {
                console.error("Error getting data from Firestore: ", error);
            });
        } else {
            // Handle the case when currentUser is not set
            console.log("No user is currently signed in.");
        }
    });
}

// Run the function to fetch and update additional user information
getOtherInfoFromDB();

// Add click event listener to the sign-out button
document.getElementById("sign-out").addEventListener("click", () => {
    // Call the logout function when the button is clicked
    logout();

    // Redirect to "index.html"
    window.location.href = "index.html";
});

// Add click event listener to the about button
document.getElementById("about").addEventListener("click", () => {
    // Redirect to "about.html"
    window.location.href = "about.html";
});

// Global variable to store the File Object reference for user profile picture
let ImageFile;

//--------------------------------------------------
// Function to handle file input and update preview
//--------------------------------------------------
function chooseFileListener() {
    const fileInput = document.getElementById("mypic-input"); // Pointer #1
    const image = document.getElementById("mypic-goes-here"); // Pointer #2

    // Attach listener to input file
    // When this file changes, do something
    fileInput.addEventListener('change', e => {
        // The change event returns a file "e.target.files[0]"
        ImageFile = e.target.files[0];
        const blob = URL.createObjectURL(ImageFile);

        // Change the DOM img element source to point to this file
        image.src = blob; // Assign the "src" property of the "img" tag
    });
}

// Run the function to enable file input listener
chooseFileListener();

//----------------------------------------------------
// Function to populate share card section on the page
//----------------------------------------------------
function populateShare() {
    const shareCardTemplate = document.getElementById("shareCardTemplate");
    const shareCardGroup = document.getElementById("shareCardGroup");

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Reference to the user_uploads collection for the specific user UID
            let userUploadsCollection = db.collection("users").doc(user.uid).collection("user_uploads");

            // Get documents from the user_uploads collection
            userUploadsCollection.orderBy("last_updated", "desc").limit(4).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    // Access the data inside the document
                    var product = doc.data().product;
                    var price = doc.data().price;
                    var amount = doc.data().amount;
                    var storeName = doc.data().storeName;
                    var address = doc.data().address;
                    var photo = doc.data().photo

                    // Clone the share card template
                    let shareCard = shareCardTemplate.content.cloneNode(true);

                    // Populate the cloned template with data
                    shareCard.querySelector(".product").innerHTML = `Product: ${product}`;
                    shareCard.querySelector(".price").innerHTML = `Price: ${price}`;
                    shareCard.querySelector(".amount").innerHTML = `Amount: ${amount}`;
                    shareCard.querySelector(".storeName").innerHTML = `StoreName: ${storeName}`;
                    shareCard.querySelector(".address").innerHTML = `Address: ${address}`;
                    // If there is a photo, set the src attribute of the photo element to the photo URL
                    if (photo) {
                        shareCard.querySelector(".photo").src = photo
                    }

                    // Append the cloned and populated template to the share card group
                    shareCardGroup.appendChild(shareCard);
                });
            });
        }
    });
}

// Run the function to populate share cards
populateShare();