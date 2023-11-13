editCard = function(card, item, identifier) {
    let tempDiv = document.createElement('div');
tempDiv.appendChild(card.cloneNode(true));
console.log(tempDiv.innerHTML);
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
}

removeCard = function(identifier, lastQuantity=1) {
    let card = document.getElementById(`card_${identifier}`);
    let undoBlock = document.getElementById("undo_block");
    let itemName = card.querySelector(".card_title").innerHTML;

    let blockClone = undoBlock.innerHTML.cloneNode(true);
    blockClone.querySelector(".item_name").innerHTML = itemName;

    blockClone.querySelector(".undo").addEventListener("click", function(){
        card.innerHTML = undoBlock.innerHTML;
        document.getElementById(`quantity_${identifier}`).value = lastQuantity;
    });

    card.innerHTML = undoBlock.innerHTML;
}

addCardEvents = function(card, identifier, list_item) {
    card.querySelector(".subtract").addEventListener("click", function(){
        //get quantity from database
        previous_quantity = list_item.data().quantity;
        // change quantity in page
        document.getElementById("quantity_" + identifier).value = previous_quantity - 1;
        //check if quantity is 0
        if (previous_quantity - 1 <= 0) {
            //remove card
            removeCard(identifier);
            //remove from database
            list_item.delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        } else {
            //subtract one from quantity in database
            list_item.update({quantity: previous_quantity - 1})
            //update total cost
            updateTotalCost(identifier, previous_quantity);
        }
    });
    card.querySelector(".card_quantity").addEventListener("change", function(){
        //get quantity from database
        previous_quantity = list_item.data().quantity;
        //check if quantity is 0
        if (document.getElementById("quantity_" + identifier).value <= 0) {
            //remove card
            removeCard(identifier);
            //remove from database
            list_item.delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        } else {
            //update quantity in database
            list_item.update({quantity: Number(document.getElementById("quantity_" + identifier).value)})
            //update total cost
            updateTotalCost(identifier, previous_quantity);
        }
    })
    card.querySelector(".add").addEventListener("click", function(){
        //get quantity from database
        previous_quantity = list_item.data().quantity;
        // change quantity in page
        document.getElementById("quantity_" + identifier).value = previous_quantity + 1;
        //check if quantity is 0
        if (previous_quantity + 1 <= 0) {
            //remove card
            removeCard(identifier);
            //remove from database
            list_item.delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        } else {
            //add one to quantity in database
            list_item.update({quantity: previous_quantity + 1})
            //update total cost
            updateTotalCost(identifier, previous_quantity);
        }
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
            updateQuantity(newCard, list_item.ref, identifier);
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
