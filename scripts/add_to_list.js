// this function adds the corresponding item to the list from the search_results page
async function add_to_list_from_search(button) {
    console.log("called by" + button.id)
    const uid = localStorage.getItem("uid");
    const item_id = button.id.split(" ")[0];
    const produce = button.id.split(" ")[1].toLowerCase();
    const isShared = button.id.split(" ")[2] === "true";
    const doc = await db.collection("users").doc(uid).collection("user_list").doc(item_id).get();
    if (doc.exists) {
        console.log("item already in list");
        button.classList.remove("deny");
        void button.offsetWidth; // trick to restart animation
        button.classList.add("deny");
    } else {
        console.log("item added to list");
        button.classList.remove("confirm");
        void button.offsetWidth; // trick to restart animation
        button.classList.add("confirm");
    }
    db.collection("users").doc(uid).collection("user_list").doc(item_id).set({
        produce_name: produce,
        itemid: item_id,
        quantity: 1,
        isShared: isShared,
    })
}

// this function adds the corresponding item to the list from the eachProduct page
// async function add_to_list_from_product() {
//     const uid = localStorage.getItem("uid");
//     const item_id = new URL(window.location.href).searchParams.get("docID");
//     const productDoc = await db.collection("products").doc(item_id).collection("details").doc(item_id).get();
//     db.collection("users").doc(uid).collection("user_list").add({
//         produce_name: productDoc.data().produce_name,
//         itemid: item_id,
//         quantity: 1
//     })
// }

// addButtons = function(button_class) {
//     const buttons = Array.from(document.getElementsByClassName(button_class));
//     console.log(buttons)
//     buttons.forEach(button => {
//         button.addEventListener("click", add_to_list_from_search);
//     });
    

// }

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