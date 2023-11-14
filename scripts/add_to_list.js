// this function adds the corresponding item to the list from the search_results page
function add_to_list_from_search() {
    let uid = localStorage.getItem("uid");
    let item_id = new URL(this.getAttribute("href")).searchParams.get("docID");
    db.collection("users").doc(uid).collection("user_list").add({
        itemid: item_id,
        quantity: 1
    })
}

// this function adds the corresponding item to the list from the eachProduct page
async function add_to_list_from_product() {
    let uid = localStorage.getItem("uid");
    let item_id = new URL(window.location.href).searchParams.get("docID");
    let productDoc = await db.collection("products").doc(item_id).collection("details").doc(item_id).get();
    db.collection("users").doc(uid).collection("user_list").add({
        produce_name: productDoc.data().produce_name,
        itemid: item_id,
        quantity: 1
    })
}

addButtons = function(button_class, from_search=true) {
    let buttons = document.getElementsByClassName(button_class);
    if (from_search){
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", add_to_list_from_search);
        }
    }

}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        localStorage.setItem("uid", user.uid);
        if (window.location.href.includes("search_result.html")) {
            addButtons("card-href")
        } 
        // else { // to be added with the eachProduct page
        //     addButtons("add-to-list")
        // } 
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