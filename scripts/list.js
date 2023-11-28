//--------------------------------------------------
// Populate the list card with product info.
//--------------------------------------------------
function editCard(card, product, identifier, shared=false) {
    // populate card with product image
    if (shared) {
        card.querySelector(".card_img").src = product.photo ? product.photo : "./images/noimg.png";
    } else {
        // try to get the product image, if it doesn't exist, use the noimg image
        try {
            card.querySelector(".card_img").src = `./images/${product.plu_code}.png`;
        } catch {
            card.querySelector(".card_img").src = "./images/noimg.png";
        }
    }
    // populate card with product info
    card.querySelector(".card_title").innerHTML = shared ? product.product : product.produce_name;
    card.querySelector(".card_cost").innerHTML = "$" + product.price.toFixed(2) + " CAD";
    card.querySelector(".card_store").innerHTML = shared ? product.storeName : product.store;
    card.querySelector(".card").setAttribute("id", "card_" + identifier);
    card.querySelector(".card_cost").setAttribute("id", "cost_" + identifier);
    card.querySelector(".card_quantity").setAttribute("id", "quantity_" + identifier);
}

//--------------------------------------------------
// Update total cost.
//--------------------------------------------------
function updateTotalCost(identifier, change, updateType="add") {
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

//--------------------------------------------------
// Check if list is empty.
//--------------------------------------------------
function checkIfListEmpty() {
    // fetch list
    let list = document.getElementById("user_list");
    // if list is empty, display message
    if (list.innerHTML == "") {
        list.innerHTML = "Your list is empty, add some items!";
        document.getElementById("total_cost").innerHTML = "0.00";
    }
}

//--------------------------------------------------
// Delete the list card.
//--------------------------------------------------
function deleteCard(card, listItem) {
    // remove the card from the page and database
    card.remove();
    listItem.ref.delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    // check if list is empty
    checkIfListEmpty();
}

//--------------------------------------------------
// Restore the list card.
//--------------------------------------------------
function restoreCard(card, previous_info, lastQuantity, identifier, listItem, deleteTimer) {
    // replace undo block with card info
    card.innerHTML = previous_info;
    // update quantity in page and database
    document.getElementById(`quantity_${identifier}`).value = lastQuantity;
    listItem.ref.update({quantity: lastQuantity});
    // update total cost
    updateTotalCost(identifier, lastQuantity);
    // clear the timer
    clearTimeout(deleteTimer);
}

//--------------------------------------------------
// Remove the list card.
//--------------------------------------------------
function removeCard(identifier, lastQuantity=1, listItem) {
    // clone the card
    let card = document.getElementById(`card_${identifier}`);
    // get the card info
    const previous_info = card.innerHTML;
    const undoBlock = document.getElementById("undo_block");
    const itemName = card.querySelector(".card_title").innerHTML;
    // clone the undo block
    let blockClone = undoBlock.content.cloneNode(true);
    blockClone.querySelector(".item_name").innerHTML = itemName;
    // set a timer to delete the card
    let deleteTimer = setTimeout(async function() {
        deleteCard(card, listItem);
    }, 10000)
    // add event listener to the card for delegation
    card.addEventListener("click", function(event){
        if (event.target.classList.contains("undo")) {
                // replace undo block with card info
            card.innerHTML = previous_info;
            // update quantity in page and database
            document.getElementById(`quantity_${identifier}`).value = lastQuantity;
            listItem.ref.update({quantity: lastQuantity});
            // update total cost
            updateTotalCost(identifier, lastQuantity);
            // clear the timer
            clearTimeout(deleteTimer);
        } else if (event.target.classList.contains("hide")) {
            deleteCard(card, listItem);
        }
    }, {once: true}); // makes the event listener only work once
    // replace the card with the undo block
    card.innerHTML = "";
    card.appendChild(blockClone); 
}

//--------------------------------------------------
// Handle quantity changes for the list cards.
//--------------------------------------------------
async function handleQuantityChange(identifier, listItem, change) {
    // get realtime updated quantity
    listItem = await listItem.ref.get();
    let previousQuantity = listItem.data().quantity;
    let newQuantity = previousQuantity + change;
    document.getElementById(`quantity_${identifier}`).value = newQuantity;
    // update quantity in database
    listItem.ref.update({quantity: newQuantity});
    updateTotalCost(identifier, change);
    if (newQuantity <= 0) {
        removeCard(identifier, previousQuantity, listItem);
    } 
}

//--------------------------------------------------
// Handle events for the list cards.
//--------------------------------------------------
async function handleEvent(event, identifier, listItem) {
    // get the target
    const target = event.target;
    // declare quantityChange variable
    let quantityChange;
    // if the target is a button
    if (event.type === "click") {
        if (target.closest(".subtract")) {
            quantityChange = -1;
        } else if (target.closest(".add")) {
            quantityChange = 1;
        } else if (target.closest(".remove")) {
            const doc = await listItem.ref.get();
            quantityChange = -doc.data().quantity;
        }
        // if the target is a quantity input
    } else if (target.closest(".card_quantity") && event.type === "change") {
        const doc = await listItem.ref.get();
        let new_quantity = Number(document.getElementById(`quantity_${identifier}`).value);
        quantityChange = new_quantity - doc.data().quantity;
    }

    if (quantityChange !== undefined) {
        handleQuantityChange(identifier, listItem, quantityChange);
    }
}

//--------------------------------------------------
// Add event listeners to the list cards.
//--------------------------------------------------
function addCardEvents(cardFragment, identifier, listItem) {
    const card = cardFragment.querySelector(".card");
    // add event listeners to the card for delegation
    card.addEventListener("click", event => handleEvent(event, identifier, listItem));
    card.addEventListener("change", event => handleEvent(event, identifier, listItem));
}


//--------------------------------------------------
// Generate the list cards.
//--------------------------------------------------
async function generateListCards(collection){
    // const variable declaration
    const user = localStorage.getItem("uid");
    const cardTemplate = document.getElementById("list_card");
    const listSnapshot = await db.collection(collection).doc(user).collection("user_list").get();
    const list = document.getElementById("user_list");
    // if the list is empty, display message
    if (listSnapshot.empty) {
        list.innerHTML = "Your list is empty, add some items!";
        return;
    }
    // iterate through each item in the list
    for (const listItem of listSnapshot.docs) {
        // get the document id, path, quantity, and isShared
        const identifier = listItem.id;
        // uses destructuring to get the data from the document
        const { path, quantity, isShared } = listItem.data();
        let newCard = cardTemplate.content.cloneNode(true);
        let productDoc = await db.doc(path).get();
        // edit the card with the product document data
        editCard(newCard, productDoc.data(), identifier, isShared);
        // add quantity to the card
        newCard.querySelector(".card_quantity").value = quantity;
        // add event listeners to the card
        addCardEvents(newCard, identifier, listItem);
        // append the card to the list
        document.getElementById("user_list").appendChild(newCard);
        updateTotalCost(identifier, 1);
    };
}

//--------------------------------------------------
// Add event listener to the clear list button.
//--------------------------------------------------
function addClearListEvent() {
    // const variable declaration
    const user = localStorage.getItem("uid");
    const clearButton = document.getElementById("clear");
    // add event listener to the clear list button
    clearButton.addEventListener("click", function(){
        // get the list collection
        const list = db.collection("users").doc(user).collection("user_list");
        // delete all documents in the list collection
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

//--------------------------------------------------
// Check if user is signed in.
//--------------------------------------------------
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
