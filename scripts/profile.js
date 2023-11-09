var currentUser;  // define a global variable to store the current user

var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userCountry = userDoc.data().country;
                    var userCity = userDoc.data().city;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userCountry != null) {
                        document.getElementById("countryInput").value = userCountry;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

// function getNameFromAuth() {
//     firebase.auth().onAuthStateChanged(user => {
//         // Check if a user is signed in:
//         if (user) {
//             // Do something for the currently logged-in user here: 
//             console.log(user.uid); //print the uid in the browser console
//             console.log(user.displayName);  //print the user name in the browser console
//             userName = user.displayName;
//             userEmail = user.email;

//             // insert user name using jquery
//             $("#name").text(userName);
//             $("#email").text(userEmail);

//         } else {
//             // No user is signed in.
//         }
//     });
// }
// getNameFromAuth(); //run the function

function getOtherInfoFromDB() {
    db.collection("users").get()   // Replace "users" with the collection name as a string
        .then((allUsers) => {
            allUsers.forEach((doc) => {
                var email = doc.data().email;
                var score = doc.data().score;
                var title = doc.data().title;

                // Update the elements with the retrieved values
                $("#email").text(email);
                $("#score").text(score);
                $("#title").text(title);
            });
        })
        .catch((error) => {
            console.error("Error getting data from Firestore: ", error);
        });
}

getOtherInfoFromDB(); // Run the function to fetch and update data

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

// Add a click event listener to the button
document.getElementById("sign-out").addEventListener("click", function () {
    // Call the logout function when the button is clicked
    logout();
    // Redirect to "index.html"
    window.location.href = "index.html";
});
