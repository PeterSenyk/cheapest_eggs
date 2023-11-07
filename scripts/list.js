editCard = function(card, item) {
    card.querySelector(".card_img").src = `./images/${item.plu_code}.png`;
    card.querySelector(".card_title").innerHTML = item.produce_name;
    card.querySelector(".card_cost").innerHTML = "$" + item.price + " CAD";
    card.querySelector(".card_store").innerHTML = item.store;
    card.querySelector(".card_text").innerHTML = item.details;
}

addCardEvents = function(card) {
    card.querySelector(".subtract").addEventListener("click", function(){
        //todo
    });
    card.querySelector(".card_quantity").addEventListener("change", function(){
        //todo
    })
    card.querySelector(".add").addEventListener("click", function(){
        //todo
    });
}

function displayListCards(collection, user){
    // get the template
    let card = document.getElementById("list_card");
    // get the uid
    uid = user.uid;
    // initialize the total cost
    let totalCost = 0;
    // gets a snapshot of the list
    db.collection(collection).doc(uid).collection("user_list").get().then((snapshot) => {
        // for each item in the list
        snapshot.docs.forEach(list => {
            // get the id of the item
            let id = list.data().itemid;
            // only create the card if quantity is greater than 0
            if (list.data().quantity > 0) {
                // clone the template
                let newCard = card.content.cloneNode(true);
                // access the item in the products collection
                db.collection("products").doc(id).get().then(doc => {
                    // edit the card
                    editCard(newCard, doc.data());
                    // add the quantity to the card
                    newCard.querySelector(".card_quantity").value = list.data().quantity;
                    // add event listeners to the buttons
                    addCardEvents(newCard);
                    // append the card to the div
                    document.getElementById(collection).appendChild(newCard);
                    // update the total cost
                    totalCost += doc.data().price * list.data().quantity;
                    // display the total cost
                    // because get() returns a promise, total cost has to be updated here or this code gets real ugly
                    document.getElementById("total_cost").innerHTML = "$" + totalCost + " CAD";
                // catch any errors
                }).catch((error) => {
                    console.error("Error getting data from Firestore: ", error);
                });
            }
        })
    })
}

// confirm a user is logged in. also allows the program to access the uid
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        displayListCards("list-cart", user);
    }
    else {
        // redirect to the login page
        window.location.href = "login.html";
    }
})

