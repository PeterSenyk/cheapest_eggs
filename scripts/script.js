// Function to log a user out.
const logout = () => firebase.auth().signOut()
  .then(() => console.log("Logging out user"))
  // If there is an error, log it to the console.
  .catch(error => console.error("Error during logout:", error));
