// Function to log a user out.
function logout() {
  /* 
  The arrow operator (=>) creates a function. The empty set of parentheses represents a function, and is how one would refer to an undeclared function.
  This is used to create limited scope functions. This can also be used as shorthand for the function keyword.
  If line 2 were replaced with ```logout = () => {``` it would be equivalent.
  The parentheses are treated the same as an actual function declaration except for the case that there is only one argument, in which they may be omitted.
  Similarly, if the function only contains one statement, so long as it would return a value, the curly braces may be omitted. 
  Ex: hello = name => "Hello " + name; hello("John"); returns "Hello John"
  */
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log("logging out user");
  }).catch((error) => {
    // An error happened.
  });
}