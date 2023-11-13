editCard = function(card, item, identifier) {
    card.querySelector(".card_img").src = `./images/${item.plu_code}.png`;
    card.querySelector(".card_title").innerHTML = item.produce_name;
    card.querySelector(".card_cost").innerHTML = "$" + item.price + " CAD";
    card.querySelector(".card_store").innerHTML = item.store;
    card.querySelector(".card_text").innerHTML = item.details;
    card.querySelector(".card").setAttribute("id", "card_" + identifier);
    card.querySelector(".card_cost").setAttribute("id", "cost_" + identifier);
    card.querySelector(".card_quantity").setAttribute("id", "quantity_" + identifier);
}

updateTotalCost = function(identifier, previous_quantity=0) {
    //get total cost
    total = document.getElementById("total_cost").innerHTML
    //get cost of item without dollar sign and " CAD"
    cost = document.getElementById(`cost_${identifier}`).innerHTML.slice(1, this.length - 4);
    //calculate what the total cost is without the item
    total -= cost * previous_quantity;
    //add the cost of the new quantity of the item
    total += cost * document.getElementById(`quantity_${identifier}`).value;
    //update total cost
    document.getElementById("total_cost").innerHTML = total;
}

removeCard = function(identifier, lastQuantity=1, list_item) {
    let card = document.getElementById(`card_${identifier}`);
    let previous_info = card.innerHTML;
    let undoBlock = document.getElementById("undo_block");
    let itemName = card.querySelector(".card_title").innerHTML;

    let blockClone = undoBlock.content.cloneNode(true);
    blockClone.querySelector(".item_name").innerHTML = itemName;

    blockClone.querySelector(".undo").addEventListener("click", function(){
        card.innerHTML = previous_info;
        document.getElementById(`quantity_${identifier}`).value = lastQuantity;
    });
    blockClone.querySelector(".hide").addEventListener("click", function(){
        card.remove();
        list_item.ref.delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    });
    card.innerHTML = undoBlock.innerHTML;
}

async function handleQuantityChange(identifier, list_item, change) {
    list_item = await list_item.ref.get();
    let previous_quantity = list_item.data().quantity;
    let new_quantity = previous_quantity + change;
    console.log(new_quantity, previous_quantity, change);
    document.getElementById(`quantity_${identifier}`).value = new_quantity;

    if (new_quantity <= 0) {
        removeCard(identifier, previous_quantity, list_item);
    } else {
        list_item.ref.update({quantity: new_quantity});
        updateTotalCost(identifier, previous_quantity);
    }
}

addCardEvents = function(card, identifier, list_item) {
    card.querySelector(".subtract").addEventListener("click", function() {
        handleQuantityChange(identifier, list_item, -1);
    });

    card.querySelector(".card_quantity").addEventListener("change", function() {
        let new_quantity = Number(document.getElementById(`quantity_${identifier}`).value);
        handleQuantityChange(identifier, list_item, new_quantity - list_item.data().quantity);
    });

    card.querySelector(".add").addEventListener("click", function() {
        handleQuantityChange(identifier, list_item, 1);
    });
}

async function generateListCards(collection){
    // get the user's uid
    let user = localStorage.getItem("uid");
    // get the template
    let card = document.getElementById("list_card");
    // gets a snapshot of the list
    let list_docs = await db.collection(collection).doc(user).collection("user_list").get();
    // if there are items in the list, uses loose equality to check if the list is empty
    // an empty list returns 0, which is falsy, but a list itself is always truthy
    if (list_docs != 0) {
        //initialize index for identifiers
        var identifier = "";
        // for each item in the list
        for (i = 0; i < list_docs.docs.length; i++) {
            list_item = list_docs.docs[i];
            identifier = list_item.id;
            // clone the template
            let newCard = card.content.cloneNode(true);
            // access the item in the products collection
            let doc = await db.collection("products").doc(list_item.data().itemid).get();
            // edit the card
            editCard(newCard, doc.data(), identifier);
            // add event listeners to the buttons
            addCardEvents(newCard, identifier, list_item);
            // add the quantity to the card
            newCard.querySelector(".card_quantity").value = list_item.data().quantity;
            // append the card to the div
            document.getElementById("user_list").appendChild(newCard);
            updateTotalCost(identifier);
        }
    } else {
        // if there are no items in the list
        document.getElementById("user_list").innerHTML = "Your list is empty, add some items!";
    }
}

addClearListEvent = function() {
    // get the user's uid
    let user = localStorage.getItem("uid");
    // get the button
    let clearButton = document.getElementById("clear");
    // add event listener
    clearButton.addEventListener("click", function(){
        // get the list
        let list = db.collection("users").doc(user).collection("user_list");
        // delete all documents in the list
        list.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });
        });
    });
}

// confirm a user is logged in. also allows the program to access the uid
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        localStorage.setItem("uid", user.uid);
        generateListCards("users");
        // addClearListEvent(user.uid);
    }
    else {
        // redirect to the login page
        window.location.href = "login.html";
    }
});
