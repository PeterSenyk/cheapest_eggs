// this function adds the corresponding item to the list from the search_results page
async function add_to_list_from_search(path, isShared) {
    const uid = localStorage.getItem("uid");
    const userList = db.collection("users").doc(uid).collection("user_list");
    const querySnapshot = await userList.where("path", "==", path).get();
    
    if (!querySnapshot.empty) {
        console.log("item already in list");

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
        console.log("item added to list");
        
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
    else {
        // todo
    }
});

addItems = function() {
    uid = localStorage.getItem("uid");
    console.log("adding items");

    db.collection("users").doc(uid).collection("user_list").add({
        produce_name: "apple",
        itemid: "ZX6yRha1zmpdZuroC8OI",
        quantity: 1
    })
    db.collection("users").doc(uid).collection("user_list").add({
        produce_name: "banana",
        itemid: "0z5R4483cwJB0TcPQJZ3",
        quantity: 1
    })
}