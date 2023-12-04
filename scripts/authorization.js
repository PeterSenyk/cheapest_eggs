// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

//-----------------------------------------
// Configuration object for FirebaseUI
//-----------------------------------------
var uiConfig = {
  callbacks: {
    // Callback triggered after a successful sign-in
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      var user = authResult.user; // Get the user object from the Firebase authentication database

      // Check if the user is a new user
      if (authResult.additionalUserInfo.isNewUser) {
        // Write user data to Firestore
        db.collection("users").doc(user.uid).set({
          name: user.displayName,
          email: user.email,
          country: "Canada", // Optional default profile info
          score: 0, // Optional default profile info
          title: "Egg Peasant" // Optional default profile info
        }).then(function () {
          console.log("New user added to Firestore");
          // Redirect to main.html after signup
          window.location.assign("main.html");
        }).catch(function (error) {
          console.log("Error adding new user: " + error);
        });
      } else {
        // User is not a new user
        return true;
      }
      return false;
    },
    // Callback triggered when the UI is shown
    uiShown: function () {
      // The widget is rendered. Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Use popup for IDP Providers sign-in flow instead of the default redirect
  signInFlow: 'popup',
  // URL to redirect to after a successful sign-in
  signInSuccessUrl: 'main.html',
  // Available sign-in options (in this case, only email/password)
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service URL
  tosUrl: '<your-tos-url>',
  // Privacy policy URL
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

// Start the FirebaseUI widget with the provided configuration
ui.start('#firebaseui-auth-container', uiConfig);