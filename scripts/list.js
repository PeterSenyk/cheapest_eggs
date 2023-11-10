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

addCardEvents = function(card, identifier, list) {
    card.querySelector(".subtract").addEventListener("click", function(){

        updateTotalCost(identifier, previous_quantity);
    });
    card.querySelector(".card_quantity").addEventListener("change", function(){

    })
    card.querySelector(".add").addEventListener("click", function(){

    });
}

updateTotalCost = function(identifier, previous_quantity) {
    //get total cost
    total = document.getElementById("total_cost").value
    //get cost of item without dollar sign and " CAD"
    cost = document.getElementById("cost_" + identifier).innerHTML.slice(1, this.length - 4);
    //calculate what the total cost is without the item
    total -= cost * previous_quantity;
    //add the cost of the new quantity of the item
    total += document.getElementById("cost_" + identifier).value * document.getElementById("quantity_" + identifier).value;
}

addTotalCost = function(index) {
    // initialize total cost
    total = 0;
    // for each item in the list
    for (i = 0; i < index; i++) {
        //get cost of item without dollar sign and " CAD"
        cost = document.getElementById("cost_" + i).innerHTML.slice(1, this.length - 4);
        //add cost of item to total
        total += cost * document.getElementById("quantity_" + i).value;
    }
    document.getElementById("total_cost").innerHTML = total;
}

async function generateListCards(collection, user){
    // get the template
    let card = document.getElementById("list_card");
    // gets a snapshot of the list
    let list_docs = await db.collection(collection).doc(user).collection("user_list").get();
    //initialize index for identifiers
    var index = 0;
    // for each item in the list
    for (i = 0; i < list_docs.docs.length; i++) {
        list = list_docs.docs[i];
        // clone the template
        let newCard = card.content.cloneNode(true);
        // access the item in the products collection
        let doc = await db.collection("products").doc(list.data().itemid).get();
        // edit the card
        editCard(newCard, doc.data(), index);
        // add the quantity to the card
        newCard.querySelector(".card_quantity").value = list.data().quantity;
        // add event listeners to the buttons
        addCardEvents(newCard, index, list);
        // append the card to the div
        document.getElementById("user_list").appendChild(newCard);
        // update the index
        index++;
        }
    addTotalCost(index);
}

// confirm a user is logged in. also allows the program to access the uid
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        generateListCards("users", user.uid);
    }
    else {
        // redirect to the login page
        window.location.href = "login.html";
    }
})

