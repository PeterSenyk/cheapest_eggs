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

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    userCountry = document.getElementById('countryInput').value;     //get the value of the field with id="schoolInput"
    userCity = document.getElementById('cityInput').value;       //get the value of the field with id="cityInput"
    currentUser.update({
        name: userName,
        country: userCountry,
        city: userCity
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
    document.getElementById('personalInfoFields').disabled = true;
}

// function saveUserInfo() {
//     firebase.auth().onAuthStateChanged(function (user) {
//         var storageRef = storage.ref("images/" + user.uid + ".jpg");

//         //Asynch call to put File Object (global variable ImageFile) onto Cloud
//         storageRef.put(ImageFile)
//             .then(function () {
//                 console.log('Uploaded to Cloud Storage.');

//                 //Asynch call to get URL from Cloud
//                 storageRef.getDownloadURL()
//                     .then(function (url) { // Get "url" of the uploaded file
//                         console.log("Got the download URL.");
//                         userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
//                         userCountry = document.getElementById('countryInput').value;     //get the value of the field with id="schoolInput"
//                         userCity = document.getElementById('cityInput').value;       //get the value of the field with id="cityInput"
//                         //Asynch call to save the form fields into Firestore.
//                         db.collection("users").doc(user.uid).update({
//                             name: userName,
//                             country: userCountry,
//                             city: userCity,
//                             profilePic: url // Save the URL into users collection
//                         })
//                             .then(function () {
//                                 console.log('Added Profile Pic URL to Firestore.');
//                                 console.log('Saved use profile info');
//                                 document.getElementById('personalInfoFields').disabled = true;
//                             })
//                     })
//             })
//     })
// }

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
    // Check if the currentUser variable is set
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Retrieve user information based on their UID
            db.collection("users").doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        var email = doc.data().email;
                        var score = doc.data().score;
                        var title = doc.data().title;

                        // Update the elements with the retrieved values
                        $("#email").text(email);
                        $("#score").text(score);
                        $("#title").text(title);
                    } else {
                        console.log("User document with UID " + user.uid + " does not exist.");
                    }
                })
                .catch((error) => {
                    console.error("Error getting data from Firestore: ", error);
                });
        } else {
            // Handle the case when currentUser is not set
            console.log("No user is currently signed in.");
        }
    });
}



getOtherInfoFromDB(); // Run the function to fetch and update data

// Add a click event listener to the button
document.getElementById("sign-out").addEventListener("click", function () {
    // Call the logout function when the button is clicked
    logout();
    // Redirect to "index.html"
    window.location.href = "index.html";
});

var ImageFile;      //global variable to store the File Object reference

function chooseFileListener() {
    const fileInput = document.getElementById("mypic-input");   // pointer #1
    const image = document.getElementById("mypic-goes-here");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function (e) {

        //the change event returns a file "e.target.files[0]"
        ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}
chooseFileListener();
