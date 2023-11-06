function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName; 
            userId = user.uid;

            // insert user name using jquery
            $("#name").text(userName);
            $("#id").text(userId);

        } else {
            // No user is signed in.
        }
    });
}
getNameFromAuth(); //run the function