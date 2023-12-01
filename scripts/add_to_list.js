//--------------------------------------------------
// Add the corresponding item to the list.
//--------------------------------------------------
async function add_to_list_from_search(path, isShared) {
    // get uid
    const uid = localStorage.getItem("uid");
    if (uid == 0) { // uses loose equality
        Swal.fire({
            // display error popup
            showConfirmButton: false,
            timer: 1000,
            title: "Not signed in",
            text: "Please sign in to add items to your list!",
            icon: "error",
            timerProgressBar: true,
        });
        return;
    }
    // get user list reference
    const userList = db.collection("users").doc(uid).collection("user_list");
    // check if item already exists in list
    const querySnapshot = await userList.where("path", "==", path).get();
    // check for document existence
    if (!querySnapshot.empty) {
        Swal.fire({
            // display error toast
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 1000,
            text: "Item already in list!",
            icon: "error",
            timerProgressBar: true,
        });
    } else {
        // add item to list
        userList.doc().set({
            path, // uses shorthand property name syntax
            quantity: 1,
            isShared, // uses shorthand property name syntax
        })
        // display success toast
        Swal.fire({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 1000,
            text: "Item added to list!",
            icon: "success",
            timerProgressBar: true,
        });
    }
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        localStorage.setItem("uid", user.uid);
    } else {
        localStorage.setItem("uid", 0);
    }
});
