// ---------------------------------------------------------------------------------------
// Add the corresponding item to the list.
// ---------------------------------------------------------------------------------------
async function add_to_list_from_search(path, isShared) {
    const uid = localStorage.getItem("uid");
    const userList = db.collection("users").doc(uid).collection("user_list");
    const querySnapshot = await userList.where("path", "==", path).get();
    
    if (!querySnapshot.empty) {
        Swal.fire({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 1000,
            text: "Item already in list!",
            icon: "error",
            timerProgressBar: true,
        });
    } else {
        userList.doc().set({
            path: path,
            quantity: 1,
            isShared: isShared,
        })

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
    }
});
