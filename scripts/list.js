editCard = function(card, product, identifier, shared=false) {
    if (shared) {card.querySelector(".card_img").src = product.photo ? product.photo : "./images/noimg.png";}
    else {
        try {
            card.querySelector(".card_img").src = `./images/${product.plu_code}.png`;
        } catch {
            card.querySelector(".card_img").src = "./images/noimg.png";
        }
    }

    // card.querySelector(".card_img").src = shared ? product.photo : `./images/${product.plu_code}.png`;
    card.querySelector(".card_title").innerHTML = shared ? product.product : product.produce_name;
    card.querySelector(".card_cost").innerHTML = "$" + product.price + " CAD";
    card.querySelector(".card_store").innerHTML = shared ? product.storeName : product.store;
    card.querySelector(".card").setAttribute("id", "card_" + identifier);
    card.querySelector(".card_cost").setAttribute("id", "cost_" + identifier);
    card.querySelector(".card_quantity").setAttribute("id", "quantity_" + identifier);
}

updateTotalCost = function(identifier, change, updateType="add") {
    //get total cost
    total = Number(document.getElementById("total_cost").innerHTML)
    //get quantity
    quantity = document.getElementById(`quantity_${identifier}`).value;
    //get cost of item without dollar sign and " CAD"
    cost = document.getElementById(`cost_${identifier}`).innerHTML.slice(1, this.length - 4);
    //switch case of the update type
    switch (updateType){
        case "remove":
            // remove the total cost of the item
            total -= cost * change;
            break;
        case "add":
            // add the total cost of the item 
            total += cost * change;
            break;
    }
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

function deleteCard(card, listItem) {
    card.remove();
    listItem.ref.delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    checkIfListEmpty();
}

function restoreCard(card, previous_info, lastQuantity, identifier, listItem, deleteTimer) {
    card.innerHTML = previous_info;
    document.getElementById(`quantity_${identifier}`).value = lastQuantity;
    listItem.ref.update({quantity: lastQuantity});
    updateTotalCost(identifier, lastQuantity);
    clearTimeout(deleteTimer);
}

removeCard = function(identifier, lastQuantity=1, listItem) {
    let card = document.getElementById(`card_${identifier}`);
    const previous_info = card.innerHTML;
    const undoBlock = document.getElementById("undo_block");
    const itemName = card.querySelector(".card_title").innerHTML;

    let blockClone = undoBlock.content.cloneNode(true);
    blockClone.querySelector(".item_name").innerHTML = itemName;

    let deleteTimer = setTimeout(async function() {
        deleteCard(card, listItem);
    }, 10000)

    card.addEventListener("click", function(event){
        if (event.target.classList.contains("undo")) {
            restoreCard(card, previous_info, lastQuantity, identifier, listItem, deleteTimer);
        } else if (event.target.classList.contains("hide")) {
            deleteCard(card, listItem);
        }
    }, 
    {once: true}); // makes the event listener only work once

    card.innerHTML = "";
    card.appendChild(blockClone); 
}

handleQuantityChange = async function(identifier, listItem, change) {
    listItem = await listItem.ref.get();
    let previousQuantity = listItem.data().quantity;
    let newQuantity = previousQuantity + change;
    document.getElementById(`quantity_${identifier}`).value = newQuantity;
    
    listItem.ref.update({quantity: newQuantity});
    updateTotalCost(identifier, change);
    if (newQuantity <= 0) {
        removeCard(identifier, previousQuantity, listItem);
    } 
}

handleEvent = async function(event, identifier, listItem) {
    const target = event.target;
    let quantityChange;

    if (event.type === "click") {
        if (target.closest(".subtract")) {
            quantityChange = -1;
        } else if (target.closest(".add")) {
            quantityChange = 1;
        } else if (target.closest(".remove")) {
            const doc = await listItem.ref.get();
            quantityChange = -doc.data().quantity;
        }
    } else if (target.closest(".card_quantity") && event.type === "change") {
        const doc = await listItem.ref.get();
        let new_quantity = Number(document.getElementById(`quantity_${identifier}`).value);
        quantityChange = new_quantity - doc.data().quantity;
    }

    if (quantityChange !== undefined) {
        handleQuantityChange(identifier, listItem, quantityChange);
    }
}

addCardEvents = function(cardFragment, identifier, listItem) {
    const card = cardFragment.querySelector(".card");
    // add event listeners to the card for delegation
    card.addEventListener("click", event => handleEvent(event, identifier, listItem));
    card.addEventListener("change", event => handleEvent(event, identifier, listItem));
}

generateListCards = async function(collection){
    const user = localStorage.getItem("uid");
    const cardTemplate = document.getElementById("list_card");
    const listSnapshot = await db.collection(collection).doc(user).collection("user_list").get();
    const list = document.getElementById("user_list");

    if (listSnapshot.empty) {
        list.innerHTML = "Your list is empty, add some items!";
        return;
    }

    for (const listItem of listSnapshot.docs) {
        const identifier = listItem.id;
        const { path, quantity, isShared } = listItem.data();
        let newCard = cardTemplate.content.cloneNode(true);
        let productDoc = await db.doc(path).get();
        editCard(newCard, productDoc.data(), identifier, isShared);
        
        newCard.querySelector(".card_quantity").value = quantity;
        addCardEvents(newCard, identifier, listItem);
        
        document.getElementById("user_list").appendChild(newCard);
       
        
        updateTotalCost(identifier, 1);
    };
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
