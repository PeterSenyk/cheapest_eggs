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

updateTotalCost = function(identifier, previousQuantity=0) {
    //get total cost
    total = document.getElementById("total_cost").innerHTML
    //get cost of item without dollar sign and " CAD"
    cost = document.getElementById(`cost_${identifier}`).innerHTML.slice(1, this.length - 4);
    //calculate what the total cost is without the item
    total -= cost * previousQuantity;
    //add the cost of the new quantity of the item
    total += cost * document.getElementById(`quantity_${identifier}`).value;
    //update total cost
    document.getElementById("total_cost").innerHTML = (Math.round(total * 100) / 100).toFixed(2);
}

checkIfListEmpty = function() {
    // fetch list
    let list = document.getElementById("user_list");
    // if list is empty, display message
    if (list.innerHTML == "") {
        list.innerHTML = "Your list is empty, add some items!";
        document.getElementById("total_cost").innerHTML = "0.00";
    }
}

removeCard = function(identifier, lastQuantity=1, listItem) {
    // fetch card
    let card = document.getElementById(`card_${identifier}`);
    // store previous info
    const previous_info = card.innerHTML;
    const undoBlock = document.getElementById("undo_block");
    const itemName = card.querySelector(".card_title").innerHTML;

    let blockClone = undoBlock.content.cloneNode(true);
    blockClone.querySelector(".item_name").innerHTML = itemName;
    // start timer to delete card
    let deleteTimer = setTimeout(async function() {
        card.remove();
        const listItemSnapshot = await listItem.ref.get();
        if (listItemSnapshot.data().quantity <= 0) {
            listItem.ref.delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    }, 10000)

    blockClone.querySelector(".undo").addEventListener("click", function(){
        card.innerHTML = previous_info;
        document.getElementById(`quantity_${identifier}`).value = lastQuantity;
        listItem.ref.update({quantity: lastQuantity});
        updateTotalCost(identifier);

        clearTimeout(deleteTimer);
    });

    blockClone.querySelector(".hide").addEventListener("click", function(){
        card.remove();
        listItem.ref.delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        checkIfListEmpty();
    });

    card.innerHTML = "";
    card.appendChild(blockClone); 
}

handleQuantityChange = async function(identifier, listItem, change) {
    listItem = await listItem.ref.get();
    let previousQuantity = listItem.data().quantity;
    let newQuantity = previousQuantity + change;
    console.log(newQuantity, previousQuantity, change);
    document.getElementById(`quantity_${identifier}`).value = newQuantity;
    
    listItem.ref.update({quantity: newQuantity});
    updateTotalCost(identifier, previousQuantity);
    if (newQuantity <= 0) {
        removeCard(identifier, previousQuantity, listItem);
    } 
}

addCardEvents = function(card, identifier, listItem) {
    card.querySelector(".subtract").addEventListener("click", function() {
        handleQuantityChange(identifier, listItem, -1);
    });

    card.querySelector(".card_quantity").addEventListener("change", function() {
        let new_quantity = Number(document.getElementById(`quantity_${identifier}`).value);
        handleQuantityChange(identifier, listItem, new_quantity - listItem.data().quantity);
    });

    card.querySelector(".add").addEventListener("click", function() {
        handleQuantityChange(identifier, listItem, 1);
    });
}

generateListCards = async function(collection){
    const user = localStorage.getItem("uid");
    const cardTemplate = document.getElementById("list_card");
    const listSnapshot = await db.collection(collection).doc(user).collection("user_list").get();
    const list = document.getElementById("user_list");

    if (!listSnapshot.empty) {
        listSnapshot.docs.forEach(async listItem =>  {
            const identifier = listItem.id;
            let newCard = cardTemplate.content.cloneNode(true);
            let productDoc = await db.collection("products").doc(listItem.data().produce_name).collection("details").doc(listItem.data().itemid).get();

            editCard(newCard, productDoc.data(), identifier);
            addCardEvents(newCard, identifier, listItem);
            newCard.querySelector(".card_quantity").value = listItem.data().quantity;

            document.getElementById("user_list").appendChild(newCard);
            updateTotalCost(identifier);
        });
    } else {
        document.getElementById("user_list").innerHTML = "Your list is empty, add some items!";
    }
}

addClearListEvent = function() {
    const user = localStorage.getItem("uid");
    const clearButton = document.getElementById("clear");

    clearButton.addEventListener("click", function(){
        const list = db.collection("users").doc(user).collection("user_list");
        
        list.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            })
        }).then(() => {
            document.getElementById("user_list").innerHTML = "";
            checkIfListEmpty();
        })
    });
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        localStorage.setItem("uid", user.uid);
        generateListCards("users");
        addClearListEvent();
    }
    else {
        window.location.href = "login.html";
    }
});
